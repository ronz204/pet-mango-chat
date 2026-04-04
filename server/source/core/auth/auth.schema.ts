import { t } from "elysia";

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
