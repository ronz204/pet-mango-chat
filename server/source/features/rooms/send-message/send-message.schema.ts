import { t, type Static } from "elysia";

export const SendMessageParams = t.Object({
  roomId: t.Number({ minimum: 1 }),
});

export const SendMessageBody = t.Object({
  event: t.Literal("message:send"),
  content: t.String({ minLength: 1, maxLength: 2000 }),
});

export const OnMessageArgs = t.Object({
  roomId: t.Number({ minimum: 1 }),
  userId: t.Number({ minimum: 1 }),
  content: t.String({ minLength: 1, maxLength: 2000 }),
});

export const SendMessageResponse = t.Object({
  id: t.Number(),
  content: t.String(),
  senderId: t.Number(),
  senderName: t.String(),
  timestamp: t.String(),
});

export type SendMessageParams = Static<typeof SendMessageParams>;
export type SendMessageBody = Static<typeof SendMessageBody>;
export type OnMessageArgs = Static<typeof OnMessageArgs>;
export type SendMessageResponse = Static<typeof SendMessageResponse>;
