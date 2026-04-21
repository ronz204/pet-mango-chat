import { Elysia } from "elysia";
import { UserDao } from "@dal/users/user.dao";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@database/prisma.plugin";

import { SignUpUserBody } from "./signup-user.schema";
import { SignUpUserHandler } from "./signup-user.handler";
import { SignUpUserResponse } from "./signup-user.schema";

const name: string = "signup-user.plugin";

export const SignUpUserPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const dao = new UserDao(prisma);
    const handler = new SignUpUserHandler(dao);

    return { handler };
  })

  .post("/signup", async ({ status, body, jwt, handler }) => {
    const response = await handler.handle({ body });
    const token = await jwt.sign(response);
    
    return status(200, { token, type: "Bearer" });
  }, {
    body: SignUpUserBody,
    response: {
      200: SignUpUserResponse,
    },
  });