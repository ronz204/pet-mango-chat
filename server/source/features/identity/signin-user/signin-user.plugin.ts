import { Elysia } from "elysia";
import { UserDao } from "@dal/users/user.dao";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@database/prisma.plugin";

import { SignInUserBody } from "./signin-user.schema";
import { SignInUserHandler } from "./signin-user.handler";
import { SignInUserResponse } from "./signin-user.schema";

const name: string = "signin-user.plugin";

export const SignInUserPlugin = new Elysia({ name })
  .use(PrismaPlugin)
  .use(AuthPlugin)

  .derive(({ prisma }) => {
    const dao = new UserDao(prisma);
    const handler = new SignInUserHandler(dao);
    
    return { handler };
  })

  .post("/signin", async ({ status, body, jwt, handler }) => {
    const response = await handler.handle({ body });
    const token = await jwt.sign(response);

    return status(200, { token, type: "Bearer" });
  }, {
    body: SignInUserBody,
    response: {
      200: SignInUserResponse,
    },
  });
