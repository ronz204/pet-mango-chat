import type { IUserDao } from "@dal/users/user.idao";
import type { RefreshRequest } from "./refresh.schema";
import type { RefreshResponse } from "./refresh.schema";

export class RefreshHandler {
  constructor(private dao: IUserDao) {};

  public async handle(req: RefreshRequest): Promise<RefreshResponse> {
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
