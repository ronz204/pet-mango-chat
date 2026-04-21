import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { RedisPlugin } from "@database/redis.plugin";
import { PresenceCache } from "@cache/presence/presence.cache";

import { PresenceParams } from "./presence.schema";
import { PresenceHandler } from "./presence.handler";

const prefix: string = "/presence";
const name: string = "presence.plugin";

const TOPIC = (roomId: number) => `room:${roomId}:presence`;

export const PresencePlugin = new Elysia({ name, prefix })
  .use(AuthPlugin)
  .use(RedisPlugin)

  .derive(({ redis }) => {
    const cache = new PresenceCache(redis);
    const handler = new PresenceHandler(cache);

    return { handler };
  })

  .ws("/:roomId", {
    isWsAuth: true,
    params: PresenceParams,

    open: async (ws) => {
      const { roomId } = ws.data.params;
      const { userId, handler } = ws.data;

      const userIds = await handler.onOpen({ roomId, userId });

      ws.subscribe(TOPIC(roomId));
      ws.send({ event: "online:list", userIds });
      ws.publish(TOPIC(roomId), { event: "user:online", userId });
    },

    close: async (ws) => {
      const { roomId } = ws.data.params;
      const { userId, handler } = ws.data;

      await handler.onClose({ roomId, userId });
      ws.publish(TOPIC(roomId), { event: "user:offline", userId });
    },
  });;
