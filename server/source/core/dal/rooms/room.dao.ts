import type { IRoomDao } from "./room.idao";
import { PrismaClient } from "@prisma/client";

import { GetOwn } from "./queries/getown.query";
import { Create } from "./queries/create.query";
import { Obtain } from "./queries/obtain.query";
import { Details } from "./queries/details.query";

export class RoomDao implements IRoomDao {
  constructor(private prisma: PrismaClient) {};

  public async create(args: Create.Args) {
    return await this.prisma.room.create(Create.query(args));
  };

  public async getOwn(args: GetOwn.Args) {
    return await this.prisma.room.findMany(GetOwn.query(args));
  };

  public async obtain(args: Obtain.Args) {
    return await this.prisma.room.findFirst(Obtain.query(args));
  };

  public async details(args: Details.Args) {
    return await this.prisma.room.findUnique(Details.query(args));
  };
};
