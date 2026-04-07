import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";
import { InvitationDao } from "@dal/invitations/invitation.dao";

import { GetMyInvitationsHandler } from "./get-my-invitations.handler";
import { GetMyInvitationsResponse } from "./get-my-invitations.schema";

const name: string = "get-my-invitations.plugin";

export const GetMyInvitationsPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const inviteDao = new InvitationDao(prisma);
    const handler = new GetMyInvitationsHandler(inviteDao);

    return { handler };
  })

  .get("/mine", async ({ status, userId, handler }) => {
    const response = await handler.handle({ userId });
    return status(200, response);
  }, {
    isAuth: true,
    response: {
      200: GetMyInvitationsResponse,
    },
  });
