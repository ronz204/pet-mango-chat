import type { IInviteDao } from "@dal/invitations/invite.idao";
import type { GetEligibleInviteesRequest } from "./get-elegible-invitees.schema";
import type { GetEligibleInviteesResponse } from "./get-elegible-invitees.schema";

type Request = GetEligibleInviteesRequest;
type Response = GetEligibleInviteesResponse;

export class GetEligibleInviteesHandler {
  constructor(private dao: IInviteDao) {};

  public async handle({ params }: Request): Promise<Response> {
    const users = await this.dao.invitees({
      roomId: params.roomId,
    });

    return {
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
      })),
    };
  };
};
