import { t, type Static } from "elysia";

export const SendInvitationBody = t.Object({
  roomId: t.Number(),
  inviteeId: t.Number(),
});

export const SendInvitationRequest = t.Object({
  body: SendInvitationBody,
});

export const SendInvitationResponse = t.Object({
  success: t.Boolean(),
  invitationId: t.Number(),
});

export type SendInvitationRequest = Static<typeof SendInvitationRequest>;
export type SendInvitationResponse = Static<typeof SendInvitationResponse>;