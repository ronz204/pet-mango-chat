import { Elysia } from "elysia";
import { AcceptInvitationPlugin } from "./accept-invitation/accept-invitation.plugin";
import { DeclineInvitationPlugin } from "./decline-invitation/decline-invitation.plugin";
import { CreateInvitationPlugin } from "./create-invitation/create-invitation.plugin";
import { GetEligibleInviteesPlugin } from "./get-elegible-invitees/get-elegible-invitees.plugin";
import { GetMyInvitationsPlugin } from "./get-my-invitations/get-my-invitations.plugin";

const prefix: string = "/invitations";
const name: string = "invitations.plugin";

export const InvitationsPlugin = new Elysia({ name, prefix })
  .use(CreateInvitationPlugin)
  .use(AcceptInvitationPlugin)
  .use(DeclineInvitationPlugin)
  .use(GetEligibleInviteesPlugin)
  .use(GetMyInvitationsPlugin);
