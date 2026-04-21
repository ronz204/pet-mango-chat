import type { IInviteDao } from "./invite.idao";
import { PrismaClient } from "@prisma/client";

import { Create } from "./queries/create.query";
import { Update } from "./queries/update.query";
import { Obtain } from "./queries/obtain.query";
import { Search } from "./queries/search.query";
import { Invitees } from "./queries/invitees.query";

export class InviteDao implements IInviteDao {
  constructor(private prisma: PrismaClient) {};

  public async invitees(args: Invitees.Args) {
    return await this.prisma.user.findMany(Invitees.query(args));
  };

  public async create(args: Create.Args) {
    return await this.prisma.invitation.create(Create.query(args));
  };

  public async update(args: Update.Args) {
    return await this.prisma.invitation.update(Update.query(args));
  };

  public async obtain(args: Obtain.Args) {
    return await this.prisma.invitation.findFirst(Obtain.query(args));
  };

  public async search(args: Search.Args) {
    return await this.prisma.invitation.findMany(Search.query(args));
  };
};
