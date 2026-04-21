import { t, type Static } from "elysia";

export const CreateInvitationBody = t.Object({
  roomId: t.Number(),
  inviteeId: t.Number(),
});

export const CreateInvitationRequest = t.Object({
  body: CreateInvitationBody,
});

export const CreateInvitationResponse = t.Object({
  success: t.Boolean(),
  invitationId: t.Number(),
});

export type CreateInvitationRequest = Static<typeof CreateInvitationRequest>;
export type CreateInvitationResponse = Static<typeof CreateInvitationResponse>;
