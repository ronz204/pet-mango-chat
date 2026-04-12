import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "The email field is required")
    .max(256, "The email must be at most 256 characters long"),
  password: z
    .string()
    .min(8, "The password must be at least 8 characters long")
    .max(128, "The password must be at most 128 characters long")
});

export type LoginSchema = z.infer<typeof loginSchema>;
