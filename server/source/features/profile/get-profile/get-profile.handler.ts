import type { IUserDao } from "@dal/users/user.idao";
import type { GetProfileRequest } from "./get-profile.schema";
import type { GetProfileResponse } from "./get-profile.schema";

type Request = GetProfileRequest;
type Response = GetProfileResponse;

export class GetProfileHandler {
  constructor(private dao: IUserDao) {};

  public async handle(req: Request): Promise<Response> {
    const user = await this.dao.obtain({ id: req.userId });
    if (!user) throw new Error("User not found");

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  };
};
