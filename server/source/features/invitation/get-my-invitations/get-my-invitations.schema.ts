import { t, type Static } from "elysia";

export const GetMyInvitationsRequest = t.Object({
  userId: t.Number(),
});

export const InvitationDto = t.Object({
  id: t.Number(),
  status: t.String(),
  createdAt: t.Date(),
  room: t.Object({
    id: t.Number(),
    name: t.String(),
  }),
});

export const GetMyInvitationsResponse = t.Object({
  invitations: t.Array(InvitationDto),
});

export type GetMyInvitationsRequest = Static<typeof GetMyInvitationsRequest>;
export type GetMyInvitationsResponse = Static<typeof GetMyInvitationsResponse>;