import type { IRoomDao } from "@dal/rooms/room.idao";
import type { LeaveRequest } from "./leave.schema";
import type { LeaveResponse } from "./leave.schema";

export class LeaveHandler {
  constructor(private dao: IRoomDao) { };

  public async handle(req: LeaveRequest): Promise<LeaveResponse> {
    const { roomId } = req.params;
    const { userId } = req;

    await this.dao.leave({ roomId, userId });
    return { success: true, message: "Left the room successfully." };
  };
};
