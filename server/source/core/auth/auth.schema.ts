import { t, type Static } from "elysia";

export const AuthQuery = t.Object({
  token: t.String(),
});

export const AuthSchema = t.Object({
  userId: t.Number(),
});

export const AuthHeaders = t.Object({
  authorization: t.Optional(t.String()),
});

export const AuthResponse = {
  401: t.Object({
    error: t.Literal("Unauthorized"),
    message: t.String(),
  }),
} as const;

export type AuthQuery = Static<typeof AuthQuery>;
export type AuthSchema = Static<typeof AuthSchema>;
export type AuthHeaders = Static<typeof AuthHeaders>;