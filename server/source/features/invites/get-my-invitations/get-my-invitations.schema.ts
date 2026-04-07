import { t, type Static } from "elysia";

const InvitationDto = t.Object({
  id: t.Number(),
  roomId: t.Number(),
  roomName: t.String(),
  status: t.String(),
  createdAt: t.Date(),
});

export const GetMyInvitationsRequest = t.Object({
  userId: t.Number(),
});

export const GetMyInvitationsResponse = t.Object({
  invitations: t.Array(InvitationDto),
});

export type GetMyInvitationsRequest = Static<typeof GetMyInvitationsRequest>;
export type GetMyInvitationsResponse = Static<typeof GetMyInvitationsResponse>;
