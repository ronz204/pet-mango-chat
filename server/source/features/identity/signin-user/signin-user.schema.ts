import { t, type Static } from "elysia";

export const SignInUserBody = t.Object({
  email: t.String({ format: "email", maxLength: 255 }),
  password: t.String({ minLength: 8, maxLength: 64 }),
});

export const SignInUserRequest = t.Object({
  body: SignInUserBody,
});

export const SignInUserPayload = t.Object({
  userId: t.Number(),
});

export const SignInUserResponse = t.Object({
  token: t.String(),
  type: t.String(),
});

export type SignInUserRequest = Static<typeof SignInUserRequest>;
export type SignInUserPayload = Static<typeof SignInUserPayload>;
export type SignInUserResponse = Static<typeof SignInUserResponse>;
