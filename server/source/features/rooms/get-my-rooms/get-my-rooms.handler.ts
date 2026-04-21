import type { IRoomDao } from "@dal/rooms/room.idao";
import type { GetMyRoomsRequest } from "./get-my-rooms.schema";
import type { GetMyRoomsResponse } from "./get-my-rooms.schema";

type Request = GetMyRoomsRequest;
type Response = GetMyRoomsResponse;

export class GetMyRoomsHandler {
  constructor(private dao: IRoomDao) {};

  public async handle({ userId }: Request): Promise<Response> {
    const rooms = await this.dao.getOwn({ userId });
    return { rooms: rooms.map(room => ({ id: room.id, name: room.name })) };
  };
};
