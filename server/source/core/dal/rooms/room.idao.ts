import type { User } from "@prisma/client";
import type { Room } from "@prisma/client";
import type { Member } from "@prisma/client";

import { Leave } from "./queries/leave.query";
import { Create } from "./queries/create.query";
import { Obtain } from "./queries/obtain.query";
import { Invitees } from "./queries/invitees.query";

export interface IRoomDao {
  leave(args: Leave.Args): Promise<Member>;
  create(args: Create.Args): Promise<Room>;
  invitees(args: Invitees.Args): Promise<User[]>;
  obtain(args: Obtain.Args): Promise<Room | null>;
};
