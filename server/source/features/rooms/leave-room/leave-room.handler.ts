import { MemberStatus } from "@prisma/enums";

import type { IMemberDao } from "@dal/members/member.idao";
import type { LeaveRoomRequest } from "./leave-room.schema";
import type { LeaveRoomResponse } from "./leave-room.schema";

type Request = LeaveRoomRequest;
type Response = LeaveRoomResponse;

export class LeaveRoomHandler {
  constructor(private dao: IMemberDao) {};

  public async handle(req: Request): Promise<Response> {
    const exists = await this.dao.obtain({
      userId: req.userId,
      roomId: req.params.roomId,
      status: MemberStatus.ACTIVE,
    });

    if (!exists) throw new Error("Not a member of the room");

    await this.dao.delete({ ...req.params, userId: req.userId });
    return { success: true, message: "Left the room successfully" };
  };
};
