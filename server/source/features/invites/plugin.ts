import { Elysia } from "elysia";
import { SendInvitationPlugin } from "./send-invitation/send-invitation.plugin";
import { AcceptInvitationPlugin } from "./accept-invitation/accept-invitation.plugin";

const prefix: string = "/invitations";
const name: string = "invitations.plugin";

export const InvitationsPlugin = new Elysia({ name, prefix })
  .use(SendInvitationPlugin)
  .use(AcceptInvitationPlugin);

