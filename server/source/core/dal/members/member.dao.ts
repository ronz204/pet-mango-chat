import type { IMemberDao } from "./member.idao";
import { PrismaClient } from "@prisma/client";

import { Exists } from "./queries/exists.query";
import { Delete } from "./queries/delete.query";

export class MemberDao implements IMemberDao {
  constructor(private prisma: PrismaClient) {};

  public async delete(args: Delete.Args) {
    return await this.prisma.member.delete(Delete.query(args));
  };

  public async exists(args: Exists.Args) {
    return await this.prisma.room.findFirst(Exists.query(args));
  };
};
