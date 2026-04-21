import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { MemberDao } from "@dal/member/member.dao";
import { PrismaPlugin } from "@database/prisma.plugin";
import { InviteDao } from "@dal/invitations/invite.dao";

import { AcceptInvitationParams } from "./accept-invitation.schema";
import { AcceptInvitationHandler } from "./accept-invitation.handler";
import { AcceptInvitationResponse } from "./accept-invitation.schema";

const name: string = "accept-invitation.plugin";

export const AcceptInvitationPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const inviteDao = new InviteDao(prisma);
    const memberDao = new MemberDao(prisma);
    const handler = new AcceptInvitationHandler(memberDao, inviteDao);

    return { handler };
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
