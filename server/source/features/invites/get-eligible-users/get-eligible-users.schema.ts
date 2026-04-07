import { t, type Static } from "elysia";

const UserDto = t.Object({
  id: t.Number(),
  name: t.String(),
  email: t.String(),
});

export const GetEligibleUsersParams = t.Object({
  roomId: t.Number(),
});

export const GetEligibleUsersRequest = t.Object({
  params: GetEligibleUsersParams,
});

export const GetEligibleUsersResponse = t.Object({
  users: t.Array(UserDto),
});

export type GetEligibleUsersRequest = Static<typeof GetEligibleUsersRequest>;
export type GetEligibleUsersResponse = Static<typeof GetEligibleUsersResponse>;
