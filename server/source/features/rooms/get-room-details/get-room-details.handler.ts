import type { IRoomDao } from "@dal/rooms/room.idao";
import type { GetRoomDetailsRequest } from "./get-room-details.schema";
import type { GetRoomDetailsResponse } from "./get-room-details.schema";
import { GetRoomDetailsMapper } from "./get-room-details.mapper";

type Request = GetRoomDetailsRequest;
type Response = GetRoomDetailsResponse;

export class GetRoomDetailsHandler {
  constructor(private dao: IRoomDao) {};

  public async handle(req: Request): Promise<Response> {
    const details = await this.dao.details(req.params);
    if (!details) throw new Error("Room not found");
    return GetRoomDetailsMapper.toResponse(details);
  };
};
