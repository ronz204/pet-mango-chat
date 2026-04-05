import type { IRoomDao } from "@dal/rooms/room.idao";
import type { CreateRequest } from "./create.schema";
import type { CreateResponse } from "./create.schema";

export class CreateHandler {
  constructor(private dao: IRoomDao) {};

  public async handle(req: CreateRequest): Promise<CreateResponse> {
    const exists = await this.dao.obtain(req.body);
    if (exists) throw new Error("Room already exists");

    const created = await this.dao.create({
      ...req.body, ownerId: req.userId });
    
    return { id: created.id, name: created.name };
  };
};
