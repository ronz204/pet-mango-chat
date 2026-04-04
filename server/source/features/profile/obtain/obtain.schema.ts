import { t, type Static } from "elysia";

export const ObtainRequest = t.Object({
  userId: t.Number(),
});

export const ObtainResponse = t.Object({
  id: t.Number(),
  name: t.String(),
  email: t.String(),
});

export type ObtainRequest = Static<typeof ObtainRequest>;
export type ObtainResponse = Static<typeof ObtainResponse>;
