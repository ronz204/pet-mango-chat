import { t, type Static } from "elysia";

export const SignInBody = t.Object({
  email: t.String({ format: "email", maxLength: 255 }),
  password: t.String({ minLength: 8, maxLength: 64 }),
});

export const SignInRequest = t.Object({
  body: SignInBody,
});

export const SignInPayload = t.Object({
  userId: t.Number(),
});

export const SignInResponse = t.Object({
  token: t.String(),
});

export type SignInRequest = Static<typeof SignInRequest>;
export type SignInPayload = Static<typeof SignInPayload>;
export type SignInResponse = Static<typeof SignInResponse>;
