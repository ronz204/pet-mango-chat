import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { MemberDao } from "@dal/member/member.dao";
import { PrismaPlugin } from "@database/prisma.plugin";

import { LeaveRoomParams } from "./leave-room.schema";
import { LeaveRoomHandler } from "./leave-room.handler";
import { LeaveRoomResponse } from "./leave-room.schema";

const name: string = "leave-room.plugin";

export const LeaveRoomPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const dao = new MemberDao(prisma);
    const handler = new LeaveRoomHandler(dao);

    return { handler };
  })

  .post("/:roomId/leave", async ({ status, params, userId, handler }) => {
    const response = await handler.handle({ params, userId });
    return status(200, response);
  }, {
    isAuth: true,
    params: LeaveRoomParams,
    response: {
      200: LeaveRoomResponse,
    },
  });
