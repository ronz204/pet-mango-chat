import type { IUserDao } from "./user.idao";
import { PrismaClient } from "@prisma/client";
import { Search } from "./queries/search.query";
import { Create } from "./queries/create.query";
import { Obtain } from "./queries/obtain.query";

export class UserDao implements IUserDao {
  constructor(private prisma: PrismaClient) {};

  public async create(args: Create.Args) {
    return await this.prisma.user.create(Create.query(args));
  };

  public async search(args: Search.Args) {
    return await this.prisma.user.findMany(Search.query(args));
  };

  public async obtain(args: Obtain.Args) {
    return await this.prisma.user.findFirst(Obtain.query(args));
  };
};
