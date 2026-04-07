import { InvitationStatus } from "@prisma/enums";

import type { IInvitationDao } from "@dal/invitations/invitation.idao";
import type { GetMyInvitationsRequest } from "./get-my-invitations.schema";
import type { GetMyInvitationsResponse } from "./get-my-invitations.schema";

type Request = GetMyInvitationsRequest;
type Response = GetMyInvitationsResponse;

export class GetMyInvitationsHandler {
  constructor(private inviteDao: IInvitationDao) {};

  public async handle(req: Request): Promise<Response> {
    const invitations = await this.inviteDao.search({
      inviteeId: req.userId,
      status: InvitationStatus.PENDING,
    });

    return {
      invitations: invitations.map(inv => ({
        id: inv.id,
        roomId: inv.roomId,
        roomName: inv.room.name,
        status: inv.status,
        createdAt: inv.createdAt,
      })),
    };
  };
};
