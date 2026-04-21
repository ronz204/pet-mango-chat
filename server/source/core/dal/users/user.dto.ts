import { t, type Static } from "elysia";

export const UserDto = t.Object({
  id: t.Number(),
  name: t.String(),
  email: t.String(),
});

export type UserDto = Static<typeof UserDto>;