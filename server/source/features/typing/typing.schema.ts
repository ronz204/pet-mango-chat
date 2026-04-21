import { t, type Static } from "elysia";

export const TypingParams = t.Object({
  roomId: t.Number({ minimum: 1 }),
});

export const TypingMessage = t.Object({
  event: t.Union([
    t.Literal("typing:start"),
    t.Literal("typing:stop"),
  ]),
});

export const OnMessageArgs = t.Object({
  roomId: t.Number({ minimum: 1 }),
  userId: t.Number({ minimum: 1 }),
  event: t.Union([t.Literal("typing:start"), t.Literal("typing:stop")]),
});

export const OnCloseArgs = t.Object({
  roomId: t.Number({ minimum: 1 }),
  userId: t.Number({ minimum: 1 }),
});

export type TypingParams = Static<typeof TypingParams>;
export type TypingMessage = Static<typeof TypingMessage>;
export type OnMessageArgs = Static<typeof OnMessageArgs>;
export type OnCloseArgs = Static<typeof OnCloseArgs>;
