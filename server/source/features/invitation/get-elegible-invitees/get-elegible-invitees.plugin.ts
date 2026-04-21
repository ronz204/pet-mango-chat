import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@database/prisma.plugin";
import { InviteDao } from "@dal/invitations/invite.dao";

import { GetEligibleInviteesParams } from "./get-elegible-invitees.schema";
import { GetEligibleInviteesHandler } from "./get-elegible-invitees.handler";
import { GetEligibleInviteesResponse } from "./get-elegible-invitees.schema";

const name: string = "get-eligible-invitees.plugin";

export const GetEligibleInviteesPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const inviteDao = new InviteDao(prisma);
    const handler = new GetEligibleInviteesHandler(inviteDao);
    
    return { handler };
  })

  .get("/:roomId/eligibles", async ({ status, params, handler }) => {
    const response = await handler.handle({ params });
    return status(200, response);
  }, {
    isAuth: true,
    params: GetEligibleInviteesParams,
    response: {
      200: GetEligibleInviteesResponse,
    },
  });
