import { Create } from "./queries/create.query";
import { ReadAll } from "./queries/readall.query";

export interface IMessageDao {
  read(args: ReadAll.Args): Promise<ReadAll.Result[]>;
  create(args: Create.Args): Promise<Create.Result>;
};