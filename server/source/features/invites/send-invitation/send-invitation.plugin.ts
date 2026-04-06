import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";
import { InvitationDao } from "@dal/invitations/invitation.dao";

import { SendInvitationBody } from "./send-invitation.schema";
import { SendInvitationHandler } from "./send-invitation.handler";
import { SendInvitationResponse } from "./send-invitation.schema";

const name: string = "send-invitation.plugin";

export const SendInvitationPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const dao = new InvitationDao(prisma);
    const handler = new SendInvitationHandler(dao);

    return { handler };
  })

  .post("/", async ({ status, body, handler }) => {
    const response = await handler.handle({ body });
    return status(200, response);
  }, {
    isAuth: true,
    body: SendInvitationBody,
    response: {
      200: SendInvitationResponse,
    },
  });
