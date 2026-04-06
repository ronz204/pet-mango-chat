import { Details } from "@dal/rooms/queries/details.query";
import type { GetRoomDetailsResponse } from "./get-room-details.schema";

export class GetRoomDetailsMapper {
  public static toResponse(data: Details.Result): GetRoomDetailsResponse {
    return {
      id: data.id,
      name: data.name,
      members: data.members.map(member => ({
        id: member.id,
        userId: member.userId,
        userName: member.user.name,
        userRole: member.role,
      })),
    };
  };
};
