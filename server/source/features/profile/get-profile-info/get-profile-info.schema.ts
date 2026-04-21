import { t, type Static } from "elysia";

export const GetProfileInfoRequest = t.Object({
  userId: t.Number(),
});

export type GetProfileInfoRequest = Static<typeof GetProfileInfoRequest>;
