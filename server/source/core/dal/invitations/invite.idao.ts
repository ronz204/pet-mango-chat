import type { User } from "@prisma/client";
import type { Invitation } from "@prisma/client";

import { Create } from "./queries/create.query";
import { Update } from "./queries/update.query";
import { Obtain } from "./queries/obtain.query";
import { Search } from "./queries/search.query";
import { Invitees } from "./queries/invitees.query";

export interface IInviteDao {
  create(args: Create.Args): Promise<Invitation>;
  update(args: Update.Args): Promise<Invitation>;
  invitees(args: Invitees.Args): Promise<User[]>;
  obtain(args: Obtain.Args): Promise<Invitation | null>;
  search(args: Search.Args): Promise<Search.Result[]>;
};
