import { Elysia } from "elysia";
import { RoomDao } from "@dal/rooms/room.dao";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@database/prisma.plugin";

import { GetMyRoomsHandler } from "./get-my-rooms.handler";
import { GetMyRoomsResponse } from "./get-my-rooms.schema";

const name: string = "get-my-rooms.plugin";

export const GetMyRoomsPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const dao = new RoomDao(prisma);
    const handler = new GetMyRoomsHandler(dao);

    return { handler };
  })

  .get("/own", async ({ status, userId, handler }) => {
    const response = await handler.handle({ userId });
    return status(200, response);
  }, {
    isAuth: true,
    response: {
      200: GetMyRoomsResponse,
    },
  });
