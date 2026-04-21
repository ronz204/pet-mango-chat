import { t, type Static } from "elysia";

export const SignUpUserBody = t.Object({
  name: t.String({ minLength: 4, maxLength: 20 }),
  email: t.String({ format: "email", maxLength: 255 }),
  password: t.String({ minLength: 8, maxLength: 64 }),
});

export const SignUpUserRequest = t.Object({
  body: SignUpUserBody,
});

export const SignUpUserPayload = t.Object({
  userId: t.Number(),
});

export const SignUpUserResponse = t.Object({
  token: t.String(),
  type: t.String(),
});

export type SignUpUserRequest = Static<typeof SignUpUserRequest>;
export type SignUpUserPayload = Static<typeof SignUpUserPayload>;
export type SignUpUserResponse = Static<typeof SignUpUserResponse>;
