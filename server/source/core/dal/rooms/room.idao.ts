import type { Room } from "@prisma/client";

import { GetOwn } from "./queries/getown.query";
import { Create } from "./queries/create.query";
import { Obtain } from "./queries/obtain.query";
import { Details } from "./queries/details.query";

export interface IRoomDao {
  getOwn(args: GetOwn.Args): Promise<Room[]>;
  create(args: Create.Args): Promise<Room>;
  obtain(args: Obtain.Args): Promise<Room | null>;
  details(args: Details.Args): Promise<Room | null>;
};
