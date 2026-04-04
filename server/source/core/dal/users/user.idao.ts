import type { User } from "@prisma/browser";
import { Search } from "./queries/search.query";
import { Create } from "./queries/create.query";
import { Obtain } from "./queries/obtain.query";
import { Update } from "./queries/update.query";

export interface IUserDao {
  create(args: Create.Args): Promise<User>;
  update(args: Update.Args): Promise<User>;
  search(args: Search.Args): Promise<User[]>;
  obtain(args: Obtain.Args): Promise<User | null>;
};
