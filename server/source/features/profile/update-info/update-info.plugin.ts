import { Elysia } from "elysia";
import { UserDao } from "@dal/users/user.dao";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";

import { UpdateInfoBody } from "./update-info.schema";
import { UpdateInfoHandler } from "./update-info.handler";
import { UpdateInfoResponse } from "./update-info.schema";

const name: string = "update-info.plugin";

export const UpdateInfoPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const dao = new UserDao(prisma);
    const handler = new UpdateInfoHandler(dao);

    return { handler };
  })

  .patch("/", async ({ status, body, userId, handler }) => {
    const response = await handler.handle({ userId, body });
    return status(200, response);
  }, {
    isAuth: true,
    body: UpdateInfoBody,
    response: {
      200: UpdateInfoResponse,
    },
  });
