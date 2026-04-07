import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";
import { InvitationDao } from "@dal/invitations/invitation.dao";

import { GetEligibleUsersParams } from "./get-eligible-users.schema";
import { GetEligibleUsersHandler } from "./get-eligible-users.handler";
import { GetEligibleUsersResponse } from "./get-eligible-users.schema";

const name: string = "get-eligible-users.plugin";

export const GetEligibleUsersPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const inviteDao = new InvitationDao(prisma);
    return { handler: new GetEligibleUsersHandler(inviteDao) };
  })

  .get("/:roomId/eligibles", async ({ status, params, handler }) => {
    const response = await handler.handle({ params });
    return status(200, response);
  }, {
    isAuth: true,
    params: GetEligibleUsersParams,
    response: {
      200: GetEligibleUsersResponse,
    },
  });
