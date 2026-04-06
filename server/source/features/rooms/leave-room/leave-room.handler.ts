import type { IMemberDao } from "@dal/members/member.idao";
import type { LeaveRoomRequest } from "./leave-room.schema";
import type { LeaveRoomResponse } from "./leave-room.schema";

type Request = LeaveRoomRequest;
type Response = LeaveRoomResponse;

export class LeaveRoomHandler {
  constructor(private dao: IMemberDao) {};

  public async handle(req: Request): Promise<Response> {
    const exists = await this.dao.exists({
      ...req.params, userId: req.userId });

    if (!exists) throw new Error("Room not found");
    if (exists.members.length === 0) throw new Error("Not a member");

    await this.dao.delete({ ...req.params, userId: req.userId });
    return { success: true, message: "Left the room successfully" };
  };
};
