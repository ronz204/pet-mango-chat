import type { IRoomDao } from "./room.idao";
import { PrismaClient } from "@prisma/client";

import { Own } from "./queries/own.query";
import { Create } from "./queries/create.query";
import { Obtain } from "./queries/obtain.query";
import { Details } from "./queries/details.query";

export class RoomDao implements IRoomDao {
  constructor(private prisma: PrismaClient) {};

  public async own(args: Own.Args) {
    return await this.prisma.room.findMany(Own.query(args));
  };

  public async create(args: Create.Args) {
    return await this.prisma.room.create(Create.query(args));
  };

  public async obtain(args: Obtain.Args) {
    return await this.prisma.room.findFirst(Obtain.query(args));
  };

  public async details(args: Details.Args) {
    return await this.prisma.room.findUnique(Details.query(args));
  };
};
