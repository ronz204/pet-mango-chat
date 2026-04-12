import { t, type Static } from "elysia";

export const SignUpBody = t.Object({
  name: t.String({ minLength: 4, maxLength: 20 }),
  email: t.String({ format: "email", maxLength: 255 }),
  password: t.String({ minLength: 8, maxLength: 64 }),
});

export const SignUpRequest = t.Object({
  body: SignUpBody,
});

export const SignUpPayload = t.Object({
  userId: t.Number(),
});

export const SignUpResponse = t.Object({
  token: t.String(),
});

export type SignUpRequest = Static<typeof SignUpRequest>;
export type SignUpPayload = Static<typeof SignUpPayload>;
export type SignUpResponse = Static<typeof SignUpResponse>;
