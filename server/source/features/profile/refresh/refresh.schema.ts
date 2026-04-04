import { t, type Static } from "elysia";

export const RefreshBody = t.Object({
  email: t.Optional(t.String({ format: "email" })),
  name: t.Optional(t.String({ minLength: 4, maxLength: 20 })),
});

export const RefreshRequest = t.Object({
  body: RefreshBody,
  userId: t.Number(),
});

export const RefreshResponse = t.Object({
  id: t.Number(),
  name: t.String(),
  email: t.String(),
});

export type RefreshRequest = Static<typeof RefreshRequest>;
export type RefreshResponse = Static<typeof RefreshResponse>;
