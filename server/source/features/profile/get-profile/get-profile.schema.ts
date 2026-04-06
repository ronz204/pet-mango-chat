import { t, type Static } from "elysia";

export const GetProfileRequest = t.Object({
  userId: t.Number(),
});

export const GetProfileResponse = t.Object({
  id: t.Number(),
  name: t.String(),
  email: t.String(),
});

export type GetProfileRequest = Static<typeof GetProfileRequest>;
export type GetProfileResponse = Static<typeof GetProfileResponse>;
