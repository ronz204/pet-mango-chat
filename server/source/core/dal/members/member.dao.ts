import type { IMemberDao } from "./member.idao";
import { PrismaClient } from "@prisma/client";

import { Obtain } from "./queries/obtain.query";
import { Delete } from "./queries/delete.query";
import { Create } from "./queries/create.query";

export class MemberDao implements IMemberDao {
  constructor(private prisma: PrismaClient) {};

  public async delete(args: Delete.Args) {
    return await this.prisma.member.delete(Delete.query(args));
  };

  public async create(args: Create.Args) {
    return await this.prisma.member.create(Create.query(args));
  };

  public async obtain(args: Obtain.Args) {
    return await this.prisma.member.findFirst(Obtain.query(args));
  };
};
