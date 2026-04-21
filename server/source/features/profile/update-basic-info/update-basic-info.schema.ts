import { t, type Static } from "elysia";

export const UpdateBasicInfoBody = t.Object({
  email: t.Optional(t.String({ format: "email" })),
  name: t.Optional(t.String({ minLength: 4, maxLength: 20 })),
});

export const UpdateBasicInfoRequest = t.Object({
  body: UpdateBasicInfoBody,
  userId: t.Number(),
});

export type UpdateBasicInfoRequest = Static<typeof UpdateBasicInfoRequest>;
