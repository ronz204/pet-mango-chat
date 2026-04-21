import type { IMemberDao } from "@dal/member/member.idao";
import type { IInviteDao } from "@dal/invitations/invite.idao";
import type { AcceptInvitationRequest } from "./accept-invitation.schema";
import type { AcceptInvitationResponse } from "./accept-invitation.schema";

type Request = AcceptInvitationRequest;
type Response = AcceptInvitationResponse;

import { MemberRole } from "@prisma/enums";
import { InvitationStatus } from "@prisma/enums";
import { NotFoundError } from "@errors/barrep.error";

export class AcceptInvitationHandler {
  constructor(
    private memberDao: IMemberDao,
    private inviteDao: IInviteDao) {};

  public async handle({ params }: Request): Promise<Response> {
    const exists = await this.inviteDao.obtain({
      id: params.invitationId,
      status: InvitationStatus.PENDING
    });
    
    if (!exists) throw new NotFoundError("Invitation does not exist");

    const updated = await this.inviteDao.update({
      invitationId: params.invitationId,
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
