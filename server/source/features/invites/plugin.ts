import { Elysia } from "elysia";
import { SendInvitationPlugin } from "./send-invitation/send-invitation.plugin";
import { AcceptInvitationPlugin } from "./accept-invitation/accept-invitation.plugin";
import { DeclineInvitationPlugin } from "./decline-invitation/decline-invitation.plugin";
import { GetEligibleUsersPlugin } from "./get-eligible-users/get-eligible-users.plugin";

const prefix: string = "/invitations";
const name: string = "invitations.plugin";

export const InvitationsPlugin = new Elysia({ name, prefix })
  .use(SendInvitationPlugin)
  .use(AcceptInvitationPlugin)
  .use(DeclineInvitationPlugin)
  .use(GetEligibleUsersPlugin);

