import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { RedisPlugin } from "@database/redis.plugin";
import { MessageDao } from "@dal/message/message.dao";
import { PrismaPlugin } from "@database/prisma.plugin";
import { MessageCache } from "@cache/message/message.cache";

import { SendMessageParams, SendMessageBody } from "./send-message.schema";
import { SendMessageHandler } from "./send-message.handler";

const prefix: string = "/messages";
const name: string = "send-message.plugin";

const TOPIC = (roomId: number) => `room:${roomId}:messages`;

export const SendMessagePlugin = new Elysia({ name, prefix })
  .use(AuthPlugin)
  .use(RedisPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma, redis }) => {
    const dao = new MessageDao(prisma);
    const cache = new MessageCache(redis);
    const handler = new SendMessageHandler(dao, cache);

    return { handler };
  })

  .ws("/:roomId", {
    isWsAuth: true,
    params: SendMessageParams,
    body: SendMessageBody,

    open: (ws) => {
      ws.subscribe(TOPIC(ws.data.params.roomId));
    },

    message: async (ws, { content }) => {
      const { roomId } = ws.data.params;
      const { userId, handler } = ws.data;

      const message = await handler.onMessage({ roomId, userId, content });

      ws.send({ event: "message:sent", ...message });
      ws.publish(TOPIC(roomId), { event: "message:new", ...message });
    },
  });
