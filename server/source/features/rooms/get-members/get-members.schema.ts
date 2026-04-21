import { t, type Static } from "elysia";
import { MemberDto } from "@dal/member/member.dto";

export const GetMembersParams = t.Object({
  roomId: t.Number(),
});

export const GetMembersRequest = t.Object({
  params: GetMembersParams,
});

export const GetMembersResponse = t.Object({
  members: t.Array(MemberDto),
});

export type GetMembersRequest = Static<typeof GetMembersRequest>;
export type GetMembersResponse = Static<typeof GetMembersResponse>;
