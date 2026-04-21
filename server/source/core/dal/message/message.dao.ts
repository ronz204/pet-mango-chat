import { PrismaClient } from "@prisma/client";
import type { IMessageDao } from "./message.idao";

import { Create } from "./queries/create.query";
import { ReadAll } from "./queries/readall.query";

export class MessageDao implements IMessageDao {
  constructor(private prisma: PrismaClient) {};

  public async create(args: Create.Args): Promise<Create.Result> {
    return await this.prisma.message.create(Create.query(args));
  };

  public async read(args: ReadAll.Args): Promise<ReadAll.Result[]> {
    return await this.prisma.message.findMany(ReadAll.query(args));
  };
};