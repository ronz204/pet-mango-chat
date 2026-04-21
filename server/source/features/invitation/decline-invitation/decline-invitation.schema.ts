import { t, type Static } from "elysia";

export const DeclineInvitationParams = t.Object({
  invitationId: t.Number(),
});

export const DeclineInvitationRequest = t.Object({
  params: DeclineInvitationParams,
});

export const DeclineInvitationResponse = t.Object({
  success: t.Boolean(),
  invitationId: t.Number(),
});

export type DeclineInvitationRequest = Static<typeof DeclineInvitationRequest>;
export type DeclineInvitationResponse = Static<typeof DeclineInvitationResponse>;
