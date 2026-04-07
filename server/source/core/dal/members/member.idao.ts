import type { Member } from "@prisma/client";

import { Obtain } from "./queries/obtain.query";
import { Delete } from "./queries/delete.query";
import { Create } from "./queries/create.query";

export interface IMemberDao {
  delete(args: Delete.Args): Promise<Member>;
  create(args: Create.Args): Promise<Member>;
  obtain(args: Obtain.Args): Promise<Member | null>;
};
