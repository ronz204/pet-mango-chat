import { t, type Static } from "elysia";
import { MemberRole } from "@prisma/enums";

const MemberDto = t.Object({
  id: t.Number(),
  userId: t.Number(),
  userName: t.String(),
  userRole: t.Enum(MemberRole),
});

export const GetRoomDetailsParams = t.Object({
  roomId: t.Number(),
});

export const GetRoomDetailsRequest = t.Object({
  params: GetRoomDetailsParams,
});

export const GetRoomDetailsResponse = t.Object({
  id: t.Number(),
  name: t.String(),
  members: t.Array(MemberDto),
});

export type GetRoomDetailsRequest = Static<typeof GetRoomDetailsRequest>;
export type GetRoomDetailsResponse = Static<typeof GetRoomDetailsResponse>;
