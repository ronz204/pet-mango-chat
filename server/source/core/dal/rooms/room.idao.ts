import type { Room } from "@prisma/client";
import type { Member } from "@prisma/client";

import { Own } from "./queries/own.query";
import { Create } from "./queries/create.query";
import { Obtain } from "./queries/obtain.query";
import { Details } from "./queries/details.query";

export interface IRoomDao {
  own(args: Own.Args): Promise<Room[]>;
  create(args: Create.Args): Promise<Room>;
  obtain(args: Obtain.Args): Promise<Room | null>;
  details(args: Details.Args): Promise<Details.Result | null>;
};
