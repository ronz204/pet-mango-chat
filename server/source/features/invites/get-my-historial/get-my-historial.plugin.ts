import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";
import { InvitationDao } from "@dal/invitations/invitation.dao";

import { GetMyHistorialHandler } from "./get-my-historial.handler";
import { GetMyHistorialResponse } from "./get-my-historial.schema";

const name: string = "get-my-historial.plugin";

export const GetMyHistorialPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const inviteDao = new InvitationDao(prisma);
    const handler = new GetMyHistorialHandler(inviteDao);

    return { handler };
  })

  .get("/historial", async ({ status, userId, handler }) => {
    const response = await handler.handle({ userId });
    return status(200, response);
  }, {
    isAuth: true,
    response: {
      200: GetMyHistorialResponse,
    },
  });
