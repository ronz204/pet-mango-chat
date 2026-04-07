import { InvitationStatus } from "@prisma/enums";

import type { IInvitationDao } from "@dal/invitations/invitation.idao";
import type { GetMyHistorialRequest } from "./get-my-historial.schema";
import type { GetMyHistorialResponse } from "./get-my-historial.schema";

type Request = GetMyHistorialRequest;
type Response = GetMyHistorialResponse;

export class GetMyHistorialHandler {
  constructor(private inviteDao: IInvitationDao) {};

  public async handle(req: Request): Promise<Response> {
    const invitations = await this.inviteDao.search({
      inviteeId: req.userId,
      status: InvitationStatus.ACCEPTED,
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
