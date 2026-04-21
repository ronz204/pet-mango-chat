import { t, type Static } from "elysia";
import { UserDto } from "@dal/users/user.dto";

export const GetEligibleInviteesParams = t.Object({
  roomId: t.Number(),
});

export const GetEligibleInviteesRequest = t.Object({
  params: GetEligibleInviteesParams,
});

export const GetEligibleInviteesResponse = t.Object({
  users: t.Array(UserDto),
});

export type GetEligibleInviteesRequest = Static<typeof GetEligibleInviteesRequest>;
export type GetEligibleInviteesResponse = Static<typeof GetEligibleInviteesResponse>;
