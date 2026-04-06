import { t, type Static } from "elysia";

const RoomDto = t.Object({
  id: t.Number(),
  name: t.String(),
});

export const GetMyRoomsRequest = t.Object({
  userId: t.Number(),
});

export const GetMyRoomsResponse = t.Object({
  rooms: t.Array(RoomDto),
});

export type GetMyRoomsRequest = Static<typeof GetMyRoomsRequest>;
export type GetMyRoomsResponse = Static<typeof GetMyRoomsResponse>;
