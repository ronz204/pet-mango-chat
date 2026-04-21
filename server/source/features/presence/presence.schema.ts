import { t, type Static } from "elysia";

export const PresenceParams = t.Object({
  roomId: t.Number({ minimum: 1 }),
});

export const onOpenArgs = t.Object({
  roomId: t.Number({ minimum: 1 }),
  userId: t.Number({ minimum: 1 }),
});

export const onCloseArgs = t.Object({
  roomId: t.Number({ minimum: 1 }),
  userId: t.Number({ minimum: 1 }),
});

export type OnOpenArgs = Static<typeof onOpenArgs>;
export type OnCloseArgs = Static<typeof onCloseArgs>;
export type PresenceParams = Static<typeof PresenceParams>;
