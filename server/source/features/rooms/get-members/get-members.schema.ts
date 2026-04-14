import { t, type Static } from "elysia";
import { MemberRole } from "@prisma/enums";

export const GetMembersParams = t.Object({
  roomId: t.Number(),
});

const MemberDto = t.Object({
  id: t.Number(),
  userId: t.Number(),
  userName: t.String(),
  role: t.Enum(MemberRole),
});

export const GetMembersResponse = t.Object({
  members: t.Array(MemberDto),
});

export type GetMembersParams = Static<typeof GetMembersParams>;
export type GetMembersResponse = Static<typeof GetMembersResponse>;
