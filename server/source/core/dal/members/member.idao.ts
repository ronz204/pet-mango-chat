import type { Member } from "@prisma/client";

import { Exists } from "./queries/exists.query";
import { Delete } from "./queries/delete.query";

export interface IMemberDao {
  delete(args: Delete.Args): Promise<Member>;
  exists(args: Exists.Args): Promise<Exists.Result | null>;
};
