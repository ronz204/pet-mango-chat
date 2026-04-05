import { t, type Static } from "elysia";

export const CreateBody = t.Object({
  name: t.String({ minLength: 3, maxLength: 50 }),
});

export const CreateRequest = t.Object({
  body: CreateBody,
  userId: t.Number(),
});

export const CreateResponse = t.Object({
  id: t.Number(),
  name: t.String(),
});

export type CreateRequest = Static<typeof CreateRequest>;
export type CreateResponse = Static<typeof CreateResponse>;
