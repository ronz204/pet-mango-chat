import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .email()
    .min(1, "Email is required")
    .max(255, "Email is too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password is too long"),
});

export type SignInRequest = z.infer<typeof SignInSchema>;
