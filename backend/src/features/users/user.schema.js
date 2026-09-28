import { z } from "zod";

export const updateUserSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters").optional(),
    bio: z.string().max(500, "Bio cannot exceed 500 characters").optional().nullable(),
    avatarUrl: z.string().url("Please provide a valid URL").optional().nullable(),
  }),
});

export const updatePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters long"),
  }),
});
