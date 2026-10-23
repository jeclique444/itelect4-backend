import { z } from "zod";

// What a client may send to POST /api/ai. Checked before anything reaches
// Gemini, because every request is counted against the free quota.
export const aiRequestSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Describe your session plan in at least 20 characters.")
    .max(2000, "Keep the description under 2000 characters."),
});

// What Gemini must send BACK. Four fields, one enum, two arrays.
// .describe() is not a comment: the text travels to Gemini inside the
// JSON Schema and tells the model what each field is for.
export const sessionReviewSchema = z.object({
  summary: z
    .string()
    .describe("One sentence restating the study session the student described."),
  strengths: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe("What the plan already does well."),
  improvements: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe("Concrete changes to make before the session."),
  readiness: z
    .enum(["ready", "almost", "not-yet"])
    .describe("How ready the plan is to run."),
});

export type SessionReview = z.infer<typeof sessionReviewSchema>;

// Computed once at import time, not per request.
export const sessionReviewJsonSchema = z.toJSONSchema(sessionReviewSchema);