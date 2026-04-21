import type { IMemberDao } from "@dal/member/member.idao";
import type { GetMembersRequest } from "./get-members.schema";
import type { GetMembersResponse } from "./get-members.schema";

type Request = GetMembersRequest;
type Response = GetMembersResponse;

import { GetMembersMapper } from "./get-members.mapper";

export class GetMembersHandler {
  constructor(private dao: IMemberDao) {};

  public async handle({ params }: Request): Promise<Response> {
    const members = await this.dao.readAll({ roomId: params.roomId });
    return GetMembersMapper.toResponse(members);
  };
};
