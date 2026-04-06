import type { IInvitationDao } from "./invitation.idao";
import { PrismaClient } from "@prisma/client";

import { Create } from "./queries/create.query";
import { Exists } from "./queries/exists.query";

export class InvitationDao implements IInvitationDao {
  constructor(private prisma: PrismaClient) {};

  public async create(args: Create.Args) {
    return await this.prisma.invitation.create(Create.query(args));
  };

  public async exists(args: Exists.Args) {
    return await this.prisma.invitation.count(Exists.query(args));
  };
};
