import type { IRoomDao } from "./room.idao";
import { PrismaClient } from "@prisma/client";

import { Leave } from "./queries/leave.query";
import { Create } from "./queries/create.query";
import { Obtain } from "./queries/obtain.query";
import { Invitees } from "./queries/invitees.query";

export class RoomDao implements IRoomDao {
  constructor(private prisma: PrismaClient) {};

  public async leave(args: Leave.Args) {
    return await this.prisma.member.delete(Leave.query(args));
  };

  public async create(args: Create.Args) {
    return await this.prisma.room.create(Create.query(args));
  };

  public async obtain(args: Obtain.Args) {
    return await this.prisma.room.findFirst(Obtain.query(args));
  };

  public async invitees(args: Invitees.Args) {
    return await this.prisma.user.findMany(Invitees.query(args));
  };
};
