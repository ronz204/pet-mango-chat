import { t, type Static } from "elysia";

export const AcceptInvitationParams = t.Object({
  invitationId: t.Number(),
});

export const AcceptInvitationRequest = t.Object({
  params: AcceptInvitationParams,
});

export const AcceptInvitationResponse = t.Object({
  success: t.Boolean(),
  roomId: t.Number(),
});

export type AcceptInvitationRequest = Static<typeof AcceptInvitationRequest>;
export type AcceptInvitationResponse = Static<typeof AcceptInvitationResponse>;
