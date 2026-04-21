import type { IRoomDao } from "@dal/rooms/room.idao";
import type { CreateRoomRequest } from "./create-room.schema";
import type { CreateRoomResponse } from "./create-room.schema";

type Request = CreateRoomRequest;
type Response = CreateRoomResponse;

export class CreateRoomHandler {
  constructor(private dao: IRoomDao) {};

  public async handle({ body, userId }: Request): Promise<Response> {
    const exists = await this.dao.obtain(body);
    if (exists) throw new Error("Room already exists");

    const created = await this.dao.create({
      ...body, ownerId: userId });
    
    return { id: created.id, name: created.name };
  };
};
