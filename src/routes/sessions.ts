import { Router, type Request, type Response } from "express";
import { Session } from "../models/Session";
import { requireAuth } from "../middleware/auth";
import type { NewSessionBody } from "../types/index";

export const sessionRouter = Router();

// Every route below requires a token
sessionRouter.use(requireAuth);

interface IdParam {
  id: string;
}

// GET /api/sessions — list only my sessions
sessionRouter.get("/", async (req: Request, res: Response) => {
  const sessions = await Session.find({
    tutorId: req.userId,
  }).sort({ schedule: -1 });
  res.json(sessions);
});

// GET /api/sessions/:id
sessionRouter.get(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const session = await Session.findOne({
      _id: req.params.id,
      tutorId: req.userId,
    });

    if (!session) {
      res.status(404).json({ message: "No session with that id" });
      return;
    }

    res.json(session);
  },
);

// POST /api/sessions
sessionRouter.post(
  "/",
  async (
    req: Request<unknown, unknown, NewSessionBody>,
    res: Response,
  ) => {
    const session = await Session.create({
      ...req.body,
      tutorId: req.userId,
    });

    res.status(201).json(session);
  },
);

// PATCH /api/sessions/:id
sessionRouter.patch(
  "/:id",
  async (
    req: Request<IdParam, unknown, Partial<NewSessionBody>>,
    res: Response,
  ) => {
    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, tutorId: req.userId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!session) {
      res.status(404).json({ message: "No session with that id" });
      return;
    }

    res.json(session);
  },
);

// DELETE /api/sessions/:id
sessionRouter.delete(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      tutorId: req.userId,
    });

    if (!session) {
      res.status(404).json({ message: "No session with that id" });
      return;
    }

    res.status(204).send();
  },
);