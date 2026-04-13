import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(4, "The name must be at least 4 characters long")
      .max(20, "The name must be at most 20 characters long"),
    email: z
      .email("Invalid email address")
      .min(1, "The email field is required")
      .max(255, "The email must be at most 255 characters long"),
    password: z
      .string()
      .min(8, "The password must be at least 8 characters long")
      .max(64, "The password must be at most 64 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterPayload = Omit<RegisterSchema, "confirmPassword">;
