import { z } from "zod";

export const createRoomSchema = z.object({
  name: z
    .string()
    .min(3, "Room name must be at least 3 characters")
    .max(50, "Room name must be at most 50 characters"),
});

export type CreateRoomSchema = z.infer<typeof createRoomSchema>;
