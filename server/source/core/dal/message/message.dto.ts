import { t, type Static } from "elysia";

export const MessageDto = t.Object({
  id: t.Number(),
  content: t.String(),
  senderId: t.Number(),
  senderName: t.String(),
  timestamp: t.String(),
});

export type MessageDto = Static<typeof MessageDto>;