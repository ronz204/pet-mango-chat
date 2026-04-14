import type { Room } from "@prisma/client";
import type { GetRoomDetailsResponse } from "./get-room-details.schema";

export class GetRoomDetailsMapper {
  public static toResponse(data: Room): GetRoomDetailsResponse {
    return {
      id: data.id,
      name: data.name,
      /* members: data.members.map(member => ({
        id: member.id,
        userId: member.userId,
        userName: member.user.name,
        userRole: member.role,
      })), */
    };
  };
};
