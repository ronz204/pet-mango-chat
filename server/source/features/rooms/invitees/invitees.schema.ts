import { t, type Static } from "elysia";

const UserDto = t.Object({
  id: t.Number(),
  name: t.String(),
});

export const InviteesParams = t.Object({
  roomId: t.Number(),
});

export const InviteesRequest = t.Object({
  params: InviteesParams,
});

export const InviteesResponse = t.Object({
  invitees: t.Array(UserDto),
});

export type InviteesRequest = Static<typeof InviteesRequest>;
export type InviteesResponse = Static<typeof InviteesResponse>;
