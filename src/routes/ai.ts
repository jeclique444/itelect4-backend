import { Router, type Request, type Response } from "express";
import { rateLimit } from "express-rate-limit";
import { ApiError } from "@google/genai";
import { requireAuth } from "../middleware/auth";
import { aiRequestSchema } from "../schemas/aiReview";
import { reviewSession, AiReplyError } from "../ai/gemini";

export const aiRouter = Router();

// Private, like submissions. Every call spends YOUR Gemini quota.
aiRouter.use(requireAuth);

// Five requests a minute per ACCOUNT. Sits below requireAuth so req.userId
// exists. Counting by IP would make a whole classroom share five requests.
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  keyGenerator: (req: Request) => req.userId!,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Five reviews a minute is the limit. Try again shortly.",
  },
});

aiRouter.use(aiLimiter);

aiRouter.post("/", async (req: Request, res: Response) => {
  const parsed = aiRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.issues.map((issue) => issue.message),
    });
    return;
  }

  try {
    const review = await reviewSession(parsed.data.prompt);
    res.json(review);
  } catch (err) {
    // 429 from Gemini = the Google project's quota is used up.
    if (err instanceof ApiError && err.status === 429) {
      res.status(429).json({
        message: "The AI quota is used up for now. Try again later.",
      });
      return;
    }

    // Gemini refused, failed, or answered with something unusable.
    if (err instanceof ApiError || err instanceof AiReplyError) {
      console.error(err);
      res.status(502).json({
        message: "The AI service did not answer properly. Try again.",
      });
      return;
    }

    // Anything else is a bug in this app: app.ts's error handler.
    throw err;
  }
});