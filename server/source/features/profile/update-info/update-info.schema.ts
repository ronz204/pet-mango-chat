import { t, type Static } from "elysia";

export const UpdateInfoBody = t.Object({
  email: t.Optional(t.String({ format: "email" })),
  name: t.Optional(t.String({ minLength: 4, maxLength: 20 })),
});

export const UpdateInfoRequest = t.Object({
  body: UpdateInfoBody,
  userId: t.Number(),
});

export const UpdateInfoResponse = t.Object({
  id: t.Number(),
  name: t.String(),
  email: t.String(),
});

export type UpdateInfoRequest = Static<typeof UpdateInfoRequest>;
export type UpdateInfoResponse = Static<typeof UpdateInfoResponse>;
