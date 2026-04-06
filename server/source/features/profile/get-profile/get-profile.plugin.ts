import { Elysia } from "elysia";
import { UserDao } from "@dal/users/user.dao";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";

import { GetProfileHandler } from "./get-profile.handler";
import { GetProfileResponse } from "./get-profile.schema";

const name: string = "get-profile.plugin";

export const GetProfilePlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const dao = new UserDao(prisma);
    const handler = new GetProfileHandler(dao);

    return { handler };
  })
  
  .get("/", async ({ status, userId, handler }) => {
    const response = await handler.handle({ userId });
    return status(200, response);
  }, {
    isAuth: true,
    response: {
      200: GetProfileResponse,
    },
  });
