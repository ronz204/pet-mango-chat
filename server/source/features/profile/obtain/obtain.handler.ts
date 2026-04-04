import type { IUserDao } from "@dal/users/user.idao";
import type { ObtainRequest } from "./obtain.schema";
import type { ObtainResponse } from "./obtain.schema";

export class ObtainHandler {
  constructor(private dao: IUserDao) {};

  public async handle(req: ObtainRequest): Promise<ObtainResponse> {
    const user = await this.dao.obtain({ id: req.userId });
    if (!user) throw new Error("User not found");

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  };
};
