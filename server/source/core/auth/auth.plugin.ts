import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { AuthHeaders, AuthSchema, AuthResponse } from "./auth.schema";

export const AuthPlugin = new Elysia({ name: "auth.plugin" })
  .use(jwt({
    exp: "1h",
    name: "jwt",
    schema: AuthSchema,
    secret: process.env.JWT_SECRET!,
  }))

  .macro({
    isAuth: {
      headers: AuthHeaders,
      response: AuthResponse,
      resolve: async ({ status, headers, jwt }) => {
        const status401 = status(401, {
          error: "Unauthorized",
          message: "Not authorized to access this resource."
        });

        const auth = headers["authorization"];
        if (!auth?.startsWith("Bearer ")) return status401;

        const payload = await jwt.verify(auth.slice(7));
        if (!payload) return status401;

        return { userId: payload.userId };
      },
    },
  });
