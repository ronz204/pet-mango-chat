import { ReadAll } from "@dal/member/queries/readall.query";
import type { GetMembersResponse } from "./get-members.schema";

export class GetMembersMapper {
  public static toResponse(data: ReadAll.Result[]): GetMembersResponse {
    return {
      members: data.map((member) => ({
        id: member.id,
        userId: member.userId,
        userRole: member.role,
        userName: member.user.name,
      }))
    };
  };
};
