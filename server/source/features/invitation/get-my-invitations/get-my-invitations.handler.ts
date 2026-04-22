import type { IInviteDao } from "@dal/invitations/invite.idao";
import type { GetMyInvitationsRequest } from "./get-my-invitations.schema";
import type { GetMyInvitationsResponse } from "./get-my-invitations.schema";

type Request = GetMyInvitationsRequest;
type Response = GetMyInvitationsResponse;

import { InvitationStatus } from "@prisma/enums";

export class GetMyInvitationsHandler {
  constructor(private dao: IInviteDao) {}

  public async handle({ userId }: Request): Promise<Response> {
    const invitations = await this.dao.search({
      inviteeId: userId,
      status: InvitationStatus.PENDING,
    });

    return {
      invitations: invitations.map((inv) => ({
        id: inv.id,
        status: inv.status,
        createdAt: inv.createdAt,
        room: {
          id: inv.room.id,
          name: inv.room.name,
        },
      })),
    };
  }
}