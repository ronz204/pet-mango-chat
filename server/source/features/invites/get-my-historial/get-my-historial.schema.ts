import { t, type Static } from "elysia";

const InvitationDto = t.Object({
  id: t.Number(),
  roomId: t.Number(),
  roomName: t.String(),
  status: t.String(),
  createdAt: t.Date(),
});

export const GetMyHistorialRequest = t.Object({
  userId: t.Number(),
});

export const GetMyHistorialResponse = t.Object({
  invitations: t.Array(InvitationDto),
});

export type GetMyHistorialRequest = Static<typeof GetMyHistorialRequest>;
export type GetMyHistorialResponse = Static<typeof GetMyHistorialResponse>;
