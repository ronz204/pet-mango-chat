import type { Room } from "@prisma/client";
import { Create } from "./queries/create.query";
import { Obtain } from "./queries/obtain.query";

export interface IRoomDao {
  create(args: Create.Args): Promise<Room>;
  obtain(args: Obtain.Args): Promise<Room | null>;
};
