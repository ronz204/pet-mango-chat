import { t, type Static } from "elysia";

export const CreateRoomBody = t.Object({
  name: t.String({ minLength: 3, maxLength: 50 }),
});

export const CreateRoomRequest = t.Object({
  body: CreateRoomBody,
  userId: t.Number(),
});

export const CreateRoomResponse = t.Object({
  id: t.Number(),
  name: t.String(),
});

export type CreateRoomRequest = Static<typeof CreateRoomRequest>;
export type CreateRoomResponse = Static<typeof CreateRoomResponse>;
