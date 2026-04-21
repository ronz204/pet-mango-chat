import type { Member } from "@prisma/client";

import { Obtain } from "./queries/obtain.query";
import { Create } from "./queries/create.query";
import { Disable } from "./queries/disable.query";
import { ReadAll } from "./queries/readall.query";

export interface IMemberDao {
  create(args: Create.Args): Promise<Member>;
  disable(args: Disable.Args): Promise<Member>;
  obtain(args: Obtain.Args): Promise<Member | null>;
  readAll(args: ReadAll.Args): Promise<ReadAll.Result[]>;
};
