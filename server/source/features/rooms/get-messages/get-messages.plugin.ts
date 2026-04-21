import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { RedisPlugin } from "@database/redis.plugin";
import { MessageDao } from "@dal/message/message.dao";
import { PrismaPlugin } from "@database/prisma.plugin";
import { MessageCache } from "@cache/message/message.cache";

import { GetMessagesQuery } from "./get-messages.schema";
import { GetMessagesParams } from "./get-messages.schema";
import { GetMessagesHandler } from "./get-messages.handler";
import { GetMessagesResponse } from "./get-messages.schema";

const name: string = "get-messages.plugin";

export const GetMessagesPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(RedisPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma, redis }) => {
    const dao = new MessageDao(prisma);
    const cache = new MessageCache(redis);
    const handler = new GetMessagesHandler(dao, cache);

    return { handler };
  })

  .get("/:roomId/messages", async ({ status, query, params, handler }) => {
    const response = await handler.handle({ query, params });
    return status(200, response);
  }, {
    isAuth: true,
    query: GetMessagesQuery,
    params: GetMessagesParams,
    response: {
      200: GetMessagesResponse,
    },
  });
