import { Elysia } from "elysia";
import { UserDto } from "@dal/users/user.dto";
import { UserDao } from "@dal/users/user.dao";
import { AuthPlugin } from "@auth/auth.plugin";

import { PrismaPlugin } from "@database/prisma.plugin";
import { GetProfileInfoHandler } from "./get-profile-info.handler";

const name: string = "get-profile-info.plugin";

export const GetProfileInfoPlugin = new Elysia({ name })
  .use(PrismaPlugin)
  .use(AuthPlugin)

  .derive(({ prisma }) => {
    const dao = new UserDao(prisma);
    const handler = new GetProfileInfoHandler(dao);

    return { handler };
  })

  .get("/", async ({ status, userId, handler }) => {
    const response = await handler.handle({ userId });
    return status(200, response);
  }, {
    isAuth: true,
    response: {
      200: UserDto,
    },
  });
