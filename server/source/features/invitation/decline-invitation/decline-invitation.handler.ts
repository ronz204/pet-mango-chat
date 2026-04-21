import type { IInviteDao } from "@dal/invitations/invite.idao";
import type { DeclineInvitationRequest } from "./decline-invitation.schema";
import type { DeclineInvitationResponse } from "./decline-invitation.schema";

type Request = DeclineInvitationRequest;
type Response = DeclineInvitationResponse;

import { InvitationStatus } from "@prisma/enums";
import { NotFoundError } from "@errors/barrep.error";

export class DeclineInvitationHandler {
  constructor(private dao: IInviteDao) {};

  public async handle(req: Request): Promise<Response> {
    const exists = await this.dao.obtain({
      id: req.params.invitationId,
      status: InvitationStatus.PENDING,
    });
    
    if (!exists) throw new NotFoundError("Invitation does not exist");

    const updated = await this.dao.update({
      invitationId: req.params.invitationId,
      status: InvitationStatus.DECLINED,
    });

    return { success: true, invitationId: updated.id };
  };
};
