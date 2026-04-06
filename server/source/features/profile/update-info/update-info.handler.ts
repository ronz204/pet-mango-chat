import type { IUserDao } from "@dal/users/user.idao";
import type { UpdateInfoRequest } from "./update-info.schema";
import type { UpdateInfoResponse } from "./update-info.schema";

type Request = UpdateInfoRequest;
type Response = UpdateInfoResponse;

export class UpdateInfoHandler {
  constructor(private dao: IUserDao) {};

  public async handle(req: Request): Promise<Response> {
    const exists = await this.dao.obtain({ id: req.userId });
    if (!exists) throw new Error("User not found");

    const updated = await this.dao.update({
      userId: req.userId, ...req.body });
    
    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
    };
  };
};
