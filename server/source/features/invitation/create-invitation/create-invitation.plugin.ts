import { Elysia } from "elysia";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@database/prisma.plugin";
import { InviteDao } from "@dal/invitations/invite.dao";

import { CreateInvitationBody } from "./create-invitation.schema";
import { CreateInvitationHandler } from "./create-invitation.handler";
import { CreateInvitationResponse } from "./create-invitation.schema";

const name: string = "send-invitation.plugin";

export const CreateInvitationPlugin = new Elysia({ name })
  .use(AuthPlugin)
  .use(PrismaPlugin)

  .derive(({ prisma }) => {
    const dao = new InviteDao(prisma);
    const handler = new CreateInvitationHandler(dao);

    return { handler };
  })

  .post("/send", async ({ status, body, handler }) => {
    const response = await handler.handle({ body });
    return status(200, response);
  }, {
    isAuth: true,
    body: CreateInvitationBody,
    response: {
      200: CreateInvitationResponse,
    },
  });
