import { Elysia } from "elysia";
import { RoomDao } from "@dal/rooms/room.dao";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@database/prisma.plugin";

import { CreateRoomBody } from "./create-room.schema";
import { CreateRoomHandler } from "./create-room.handler";
import { CreateRoomResponse } from "./create-room.schema";

const name: string = "create-room.plugin";

export const CreateRoomPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const dao = new RoomDao(prisma);
    const handler = new CreateRoomHandler(dao);

    return { handler };
  })

  .post("/", async ({ status, body, userId, handler }) => {
    const response = await handler.handle({ userId, body });
    return status(200, response);
  }, {
    isAuth: true,
    body: CreateRoomBody,
    response: {
      200: CreateRoomResponse,
    },
  });
