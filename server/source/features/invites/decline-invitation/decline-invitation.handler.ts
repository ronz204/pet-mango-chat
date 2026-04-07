import { InvitationStatus } from "@prisma/enums";

import type { IInvitationDao } from "@dal/invitations/invitation.idao";
import type { DeclineInvitationRequest } from "./decline-invitation.schema";
import type { DeclineInvitationResponse } from "./decline-invitation.schema";

type Request = DeclineInvitationRequest;
type Response = DeclineInvitationResponse;

export class DeclineInvitationHandler {
  constructor(private inviteDao: IInvitationDao) {};

  public async handle(req: Request): Promise<Response> {
    const exists = await this.inviteDao.obtain({
      id: req.params.invitationId,
      status: InvitationStatus.PENDING,
    });
    
    if (!exists) throw new Error("Invitation does not exist");

    await this.inviteDao.update({
      invitationId: req.params.invitationId,
      status: InvitationStatus.DECLINED,
    });

    return { success: true };
  };
};
