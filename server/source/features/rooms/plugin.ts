import { Elysia } from "elysia";
import { RoomDao } from "@dal/rooms/room.dao";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";

import { CreateBody } from "./create/create.schema";
import { CreateHandler } from "./create/create.handler";
import { CreateResponse } from "./create/create.schema";

const prefix: string = "/rooms";
const name: string = "rooms.plugin";

export const RoomsPlugin = new Elysia({ name, prefix })
  .use(AuthPlugin)
  .use(PrismaPlugin)
  
  .derive(({ prisma }) => {
    const dao = new RoomDao(prisma);

    return {
      createH: new CreateHandler(dao),
    };
  })

  .post("/new", async ({ status, body, userId, createH }) => {
    const response = await createH.handle({ body, userId });
    return status(200, response);
  }, {
    isAuth: true,
    body: CreateBody,
    response: {
      200: CreateResponse,
    },
  });
