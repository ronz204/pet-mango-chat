import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { MemberDao } from "@dal/members/member.dao";
import { PrismaPlugin } from "@plugins/prisma.plugin";
import { InvitationDao } from "@dal/invitations/invitation.dao";

import { AcceptInvitationParams } from "./accept-invitation.schema";
import { AcceptInvitationHandler } from "./accept-invitation.handler";
import { AcceptInvitationResponse } from "./accept-invitation.schema";

const name: string = "accept-invitation.plugin";

export const AcceptInvitationPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const inviteDao = new InvitationDao(prisma);
    const memberDao = new MemberDao(prisma);
    return { handler: new AcceptInvitationHandler(memberDao, inviteDao) };
  })

  .patch("/:invitationId/accept", async ({ status, params, handler }) => {
    const response = await handler.handle({ params });
    return status(200, response);
  }, {
    isAuth: true,
    params: AcceptInvitationParams,
    response: {
      200: AcceptInvitationResponse,
    },
  });
