import type { IInviteDao } from "@dal/invitations/invite.idao";
import type { CreateInvitationRequest } from "./create-invitation.schema";
import type { CreateInvitationResponse } from "./create-invitation.schema";

type Request = CreateInvitationRequest;
type Response = CreateInvitationResponse;

import { InvitationStatus } from "@prisma/enums";
import { ConflictError } from "@errors/barrep.error";

export class CreateInvitationHandler {
  constructor(private dao: IInviteDao) {};

  public async handle({ body }: Request): Promise<Response> {
    const exists = await this.dao.obtain({
      ...body, status: InvitationStatus.PENDING,
    });

    if (exists) throw new ConflictError("Invitation already exists");
    
    const invitation = await this.dao.create(body);
    return { success: true, invitationId: invitation.id };
  };
};
