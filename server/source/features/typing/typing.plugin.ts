import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { RedisPlugin } from "@database/redis.plugin";
import { TypingCache } from "@cache/typing/typing.cache";

import { TypingParams, TypingMessage } from "./typing.schema";
import { TypingHandler } from "./typing.handler";

const prefix: string = "/typing";
const name: string = "typing.plugin";

const TOPIC = (roomId: number) => `room:${roomId}:typing`;

export const TypingPlugin = new Elysia({ name, prefix })
  .use(AuthPlugin)
  .use(RedisPlugin)

  .derive(({ redis }) => {
    const cache = new TypingCache(redis);
    const handler = new TypingHandler(cache);

    return { handler };
  })

  .ws("/:roomId", {
    isWsAuth: true,
    params: TypingParams,
    body: TypingMessage,

    open: (ws) => {
      ws.subscribe(TOPIC(ws.data.params.roomId));
    },

    message: async (ws, { event }) => {
      const { roomId } = ws.data.params;
      const { userId, handler } = ws.data;

      const userIds = await handler.onMessage({ roomId, userId, event });
      ws.publish(TOPIC(roomId), { event: "typing:update", userIds });
    },

    close: async (ws) => {
      const { roomId } = ws.data.params;
      const { userId, handler } = ws.data;

      const userIds = await handler.onClose({ roomId, userId });
      ws.publish(TOPIC(roomId), { event: "typing:update", userIds });
    },
  });
