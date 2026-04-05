import { t, type Static } from "elysia";

export const LeaveParams = t.Object({
  roomId: t.Numeric(),
});

export const LeaveRequest = t.Object({
  params: LeaveParams,
  userId: t.Number(),
});

export const LeaveResponse = t.Object({
  success: t.Boolean(),
  message: t.String(),
});

export type LeaveRequest = Static<typeof LeaveRequest>;
export type LeaveResponse = Static<typeof LeaveResponse>;
