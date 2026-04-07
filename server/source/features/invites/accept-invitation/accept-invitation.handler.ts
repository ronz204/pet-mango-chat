import { MemberRole } from "@prisma/enums";
import { InvitationStatus } from "@prisma/enums";

import type { IMemberDao } from "@dal/members/member.idao";
import type { IInvitationDao } from "@dal/invitations/invitation.idao";
import type { AcceptInvitationRequest } from "./accept-invitation.schema";
import type { AcceptInvitationResponse } from "./accept-invitation.schema";

type Request = AcceptInvitationRequest;
type Response = AcceptInvitationResponse;

export class AcceptInvitationHandler {
  constructor(
    private memberDao: IMemberDao,
    private inviteDao: IInvitationDao) {};

  public async handle(req: Request): Promise<Response> {
    const exists = await this.inviteDao.obtain({
      id: req.params.invitationId,
      status: InvitationStatus.PENDING,
    });
    
    if (!exists) throw new Error("Invitation does not exist");

    const updated = await this.inviteDao.update({
      invitationId: req.params.invitationId,
      status: InvitationStatus.ACCEPTED,
    });

    await this.memberDao.create({
      userId: updated.inviteeId,
      roomId: updated.roomId,
      role: MemberRole.USER,
    });

    return { success: true, roomId: updated.roomId };
  };
};
