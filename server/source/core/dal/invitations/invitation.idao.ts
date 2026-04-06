import type { Invitation } from "@prisma/client";

import { Create } from "./queries/create.query";
import { Exists } from "./queries/exists.query";

export interface IInvitationDao {
  exists(args: Exists.Args): Promise<number>;
  create(args: Create.Args): Promise<Invitation>;
};
