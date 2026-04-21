import type { IMemberDao } from "./member.idao";
import { PrismaClient } from "@prisma/client";
import type { Member } from "@prisma/client";

import { Obtain } from "./queries/obtain.query";
import { Create } from "./queries/create.query";
import { Disable } from "./queries/disable.query";
import { ReadAll } from "./queries/readall.query";

export class MemberDao implements IMemberDao {
  constructor(private prisma: PrismaClient) {};

  public async create(args: Create.Args): Promise<Member> {
    return await this.prisma.member.create(Create.query(args));
  };

  public async disable(args: Disable.Args): Promise<Member> {
    return await this.prisma.member.update(Disable.query(args));
  };

  public async obtain(args: Obtain.Args): Promise<Member | null> {
    return await this.prisma.member.findFirst(Obtain.query(args));
  };

  public async readAll(args: ReadAll.Args): Promise<ReadAll.Result[]> {
    return await this.prisma.member.findMany(ReadAll.query(args));
  };
};