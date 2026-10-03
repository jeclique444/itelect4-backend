import { Schema, model } from "mongoose";
import type { SessionDoc } from "../types/index";

const sessionSchema = new Schema<SessionDoc>(
  {
    tutorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: [true, "subject is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "duration is required"],
      min: [15, "duration must be at least 15 minutes"],
      max: [480, "duration must be at most 480 minutes"],
    },
    capacity: {
      type: Number,
      required: [true, "capacity is required"],
      min: [1, "capacity must be at least 1"],
      max: [50, "capacity must be at most 50"],
    },
    schedule: {
      type: Date,
      required: [true, "schedule is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "price cannot be negative"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "full"],
      default: "active",
    },
  },
  { timestamps: true },
);

sessionSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Session = model<SessionDoc>("Session", sessionSchema);