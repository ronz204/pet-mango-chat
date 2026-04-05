import type { IRoomDao } from "@dal/rooms/room.idao";
import type { InviteesRequest } from "./invitees.schema";
import type { InviteesResponse } from "./invitees.schema";

export class InviteesHandler {
  constructor(private dao: IRoomDao) {};

  public async handle(req: InviteesRequest): Promise<InviteesResponse> {
    const invitees = await this.dao.invitees(req.params);
    
    return { invitees: invitees.map((i) => 
      ({ id: i.id, name: i.name })) };
  };
};
