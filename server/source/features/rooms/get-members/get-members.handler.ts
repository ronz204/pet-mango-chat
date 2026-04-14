import type { IRoomDao } from "@dal/rooms/room.idao";
import type { GetMembersParams, GetMembersResponse } from "./get-members.schema";
import { GetMembersMapper } from "./get-members.mapper";

type Request = { params: GetMembersParams };
type Response = GetMembersResponse;

export class GetMembersHandler {
  constructor(private dao: IRoomDao) {};

  public async handle(req: Request): Promise<Response> {
    const members = await this.dao.members({ roomId: req.params.roomId });
    return GetMembersMapper.toResponse(members);
  };
};
