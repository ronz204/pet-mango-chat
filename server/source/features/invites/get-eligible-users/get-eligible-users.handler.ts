import type { IInvitationDao } from "@dal/invitations/invitation.idao";
import type { GetEligibleUsersRequest } from "./get-eligible-users.schema";
import type { GetEligibleUsersResponse } from "./get-eligible-users.schema";

type Request = GetEligibleUsersRequest;
type Response = GetEligibleUsersResponse;

export class GetEligibleUsersHandler {
  constructor(private inviteDao: IInvitationDao) {};

  public async handle(req: Request): Promise<Response> {
    const users = await this.inviteDao.invitees({
      roomId: req.params.roomId,
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
