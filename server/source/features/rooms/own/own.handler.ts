import type { IRoomDao } from "@dal/rooms/room.idao";
import type { OwnRequest } from "./own.schema";
import type { OwnResponse } from "./own.schema";

export class OwnHandler {
  constructor(private dao: IRoomDao) {};

  public async handle(req: OwnRequest): Promise<OwnResponse> {
    const rooms = await this.dao.own({ userId: req.userId });
    return { rooms: rooms.map(room => ({ id: room.id, name: room.name })) };
  };
};
