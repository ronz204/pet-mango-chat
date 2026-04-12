import { Elysia } from "elysia";
import { UserDao } from "@dal/users/user.dao";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";

import { SignInBody } from "./signin-user.schema";
import { SignInHandler } from "./signin-user.handler";
import { SignInResponse } from "./signin-user.schema";

const name: string = "signin-user.plugin";

export const SignInUserPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const dao = new UserDao(prisma);
    return { handler: new SignInHandler(dao) };
  })

  .post("/signin", async ({ status, body, jwt, handler }) => {
    const response = await handler.handle({ body });
    const token = await jwt.sign(response);
    return status(200, { token });
  }, {
    body: SignInBody,
    response: {
      200: SignInResponse,
    },
  });
