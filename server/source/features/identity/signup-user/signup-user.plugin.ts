import { Elysia } from "elysia";
import { UserDao } from "@dal/users/user.dao";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";

import { SignUpBody } from "./signup-user.schema";
import { SignUpHandler } from "./signup-user.handler";
import { SignUpResponse } from "./signup-user.schema";

const name: string = "signup-user.plugin";

export const SignUpUserPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const dao = new UserDao(prisma);
    return { handler: new SignUpHandler(dao) };
  })

  .post("/signup", async ({ status, body, jwt, handler }) => {
    const response = await handler.handle({ body });
    const token = await jwt.sign(response);
    return status(200, { token });
  }, {
    body: SignUpBody,
    response: {
      200: SignUpResponse,
    },
  });
