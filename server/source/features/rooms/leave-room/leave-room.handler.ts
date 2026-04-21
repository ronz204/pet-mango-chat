import type { IMemberDao } from "@dal/member/member.idao";
import type { LeaveRoomRequest } from "./leave-room.schema";
import type { LeaveRoomResponse } from "./leave-room.schema";

type Request = LeaveRoomRequest;
type Response = LeaveRoomResponse;

import { MemberStatus } from "@prisma/enums";
import { NotFoundError } from "@errors/barrep.error";

export class LeaveRoomHandler {
  constructor(private dao: IMemberDao) {};

  public async handle({ params, userId }: Request): Promise<Response> {
    const exists = await this.dao.obtain({
      userId: userId,
      roomId: params.roomId,
      status: MemberStatus.ACTIVE,
    });

    if (!exists) throw new NotFoundError("Not a member of the room");
    await this.dao.disable({ ...params, userId: userId });

    return { success: true, message: "Left the room successfully" };
  };
};
