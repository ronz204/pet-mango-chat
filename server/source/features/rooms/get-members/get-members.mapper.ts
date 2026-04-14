import type { Members } from "@dal/rooms/queries/members.query";
import type { GetMembersResponse } from "./get-members.schema";

export class GetMembersMapper {
  public static toResponse(data: Members.Result[]): GetMembersResponse {
    return {
      members: data.map((member) => ({
        id: member.id,
        userId: member.userId,
        userName: member.user.name,
        role: member.role,
      })),
    };
  };
};
