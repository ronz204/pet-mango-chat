import { t, type Static } from "elysia";

export const InvitationDto = t.Object({
  id: t.Number(),
  status: t.String(),
  roomId: t.Number(),
  roomName: t.String(),
});

export type InvitationDto = Static<typeof InvitationDto>;
