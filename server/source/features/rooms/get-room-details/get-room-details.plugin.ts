import { Elysia } from "elysia";
import { RoomDao } from "@dal/rooms/room.dao";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";

import { GetRoomDetailsParams } from "./get-room-details.schema";
import { GetRoomDetailsHandler } from "./get-room-details.handler";
import { GetRoomDetailsResponse } from "./get-room-details.schema";

const name: string = "get-room-details.plugin";

export const GetRoomDetailsPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const dao = new RoomDao(prisma);
    const handler = new GetRoomDetailsHandler(dao);

    return { handler };
  })

  .get("/:roomId", async ({ status, params, handler }) => {
    const response = await handler.handle({ params });
    return status(200, response);
  }, {
    isAuth: true,
    params: GetRoomDetailsParams,
    response: {
      200: GetRoomDetailsResponse,
    },
  });
