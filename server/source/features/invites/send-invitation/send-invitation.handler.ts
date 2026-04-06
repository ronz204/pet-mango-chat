import type { IInvitationDao } from "@dal/invitations/invitation.idao";
import type { SendInvitationRequest } from "./send-invitation.schema";
import type { SendInvitationResponse } from "./send-invitation.schema";

type Request = SendInvitationRequest;
type Response = SendInvitationResponse;

export class SendInvitationHandler {
  constructor(private dao: IInvitationDao) {};

  public async handle(req: Request): Promise<Response> {
    const exists = await this.dao.exists(req.body);
    if (exists) throw new Error("Invitation already exists");
    
    const invitation = await this.dao.create(req.body);
    return { success: true, invitationId: invitation.id };
  };
};
