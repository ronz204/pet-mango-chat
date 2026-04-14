import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(20, "Name must be at most 20 characters")
    .optional()
    .or(z.literal("")),
  email: z
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
