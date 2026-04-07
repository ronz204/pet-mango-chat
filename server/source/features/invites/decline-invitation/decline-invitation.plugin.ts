import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";
import { InvitationDao } from "@dal/invitations/invitation.dao";

import { DeclineInvitationParams } from "./decline-invitation.schema";
import { DeclineInvitationHandler } from "./decline-invitation.handler";
import { DeclineInvitationResponse } from "./decline-invitation.schema";

const name: string = "decline-invitation.plugin";

export const DeclineInvitationPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const inviteDao = new InvitationDao(prisma);
    return { handler: new DeclineInvitationHandler(inviteDao) };
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
