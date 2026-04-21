import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@database/prisma.plugin";
import { InviteDao } from "@dal/invitations/invite.dao";

import { DeclineInvitationParams } from "./decline-invitation.schema";
import { DeclineInvitationHandler } from "./decline-invitation.handler";
import { DeclineInvitationResponse } from "./decline-invitation.schema";

const name: string = "decline-invitation.plugin";

export const DeclineInvitationPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const inviteDao = new InviteDao(prisma);
    const handler = new DeclineInvitationHandler(inviteDao);

    return { handler };
  })

  .patch("/:invitationId/decline", async ({ status, params, handler }) => {
    const response = await handler.handle({ params });
    return status(200, response);
  }, {
    isAuth: true,
    params: DeclineInvitationParams,
    response: {
      200: DeclineInvitationResponse,
    },
  });
