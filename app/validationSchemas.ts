import { Status } from "@prisma/client";
import z from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  description: z.string().min(1, "Description is required").max(65535),
});

export const PatchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title is too long")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  assignedToUser: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
  status: z.nativeEnum(Status).optional().nullable(),
});

export const UserSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(20, "Username is too long"),
  email: z
    .string()
    .email()
    .min(1, "Email is required")
    .max(255, "Email is too long"),
  password: z
    .string()
    .min(8, "Password is too short")
    .max(60, "Password is too long"),
});

export const LoginUserSchema = UserSchema.omit({ username: true });
