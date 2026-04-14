import { Elysia } from "elysia";
import { RoomDao } from "@dal/rooms/room.dao";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";

import { GetMembersHandler } from "./get-members.handler";
import { GetMembersParams, GetMembersResponse } from "./get-members.schema";

const name: string = "get-members.plugin";

export const GetMembersPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const dao = new RoomDao(prisma);
    const handler = new GetMembersHandler(dao);

    return { handler };
  })

  .get("/:roomId/members", async ({ status, params, handler }) => {
    const response = await handler.handle({ params });
    return status(200, response);
  }, {
    isAuth: true,
    params: GetMembersParams,
    response: {
      200: GetMembersResponse,
    },
  });
