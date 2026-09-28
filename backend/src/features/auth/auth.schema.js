import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters long"),
    userName: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z.string().email("Please provide a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Please provide a valid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});
