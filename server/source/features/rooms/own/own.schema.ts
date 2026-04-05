import { t, type Static } from "elysia";

const RoomDto = t.Object({
  id: t.Number(),
  name: t.String(),
});

export const OwnRequest = t.Object({
  userId: t.Number(),
});

export const OwnResponse = t.Object({
  rooms: t.Array(RoomDto),
});

export type OwnRequest = Static<typeof OwnRequest>;
export type OwnResponse = Static<typeof OwnResponse>;
