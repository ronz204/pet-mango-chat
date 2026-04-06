import { t, type Static } from "elysia";

export const LeaveRoomParams = t.Object({
  roomId: t.Numeric(),
});

export const LeaveRoomRequest = t.Object({
  params: LeaveRoomParams,
  userId: t.Number(),
});

export const LeaveRoomResponse = t.Object({
  success: t.Boolean(),
  message: t.String(),
});

export type LeaveRoomRequest = Static<typeof LeaveRoomRequest>;
export type LeaveRoomResponse = Static<typeof LeaveRoomResponse>;

