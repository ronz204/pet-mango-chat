import { Elysia } from "elysia";
import { SendInvitationPlugin } from "./send-invitation/send-invitation.plugin";
import { AcceptInvitationPlugin } from "./accept-invitation/accept-invitation.plugin";
import { DeclineInvitationPlugin } from "./decline-invitation/decline-invitation.plugin";
import { GetEligibleUsersPlugin } from "./get-eligible-users/get-eligible-users.plugin";
import { GetMyInvitationsPlugin } from "./get-my-invitations/get-my-invitations.plugin";
import { GetMyHistorialPlugin } from "./get-my-historial/get-my-historial.plugin";

const prefix: string = "/invitations";
const name: string = "invitations.plugin";

export const InvitationsPlugin = new Elysia({ name, prefix })
  .use(SendInvitationPlugin)
  .use(AcceptInvitationPlugin)
  .use(DeclineInvitationPlugin)
  .use(GetEligibleUsersPlugin)
  .use(GetMyInvitationsPlugin)
  .use(GetMyHistorialPlugin);

