import type { Types } from "mongoose";

// ========================================
// FROM SESSION 1: copied from itelect4-project
// ========================================

export interface User {
  id: number;
  name: string;
  email: string;
  role: "tutor" | "tutee" | "admin";
  isActive: boolean;
  rating?: number;
  subjects?: string[];
}

export interface Session {
  id: number;
  tutorId: number;
  subject: string;
  description: string;
  duration: number;
  capacity: number;
  schedule: Date;
  price: number;
  location: string;
  status: "active" | "cancelled" | "full";
}

// ========================================
// DERIVED TYPES
// ========================================

export type UserDoc = Omit<User, "id"> & {
  password: string;
};

export type SessionDoc = Omit<Session, "id" | "tutorId"> & {
  tutorId: Types.ObjectId;
};

export type NewSessionBody = Pick<
  Session,
  "subject" | "description" | "duration" | "capacity" | "schedule" | "price" | "location"
>;