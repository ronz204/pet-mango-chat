import type { UserDto } from "@dal/users/user.dto";
import type { IUserDao } from "@dal/users/user.idao";
import type { GetProfileInfoRequest } from "./get-profile-info.schema";

type Request = GetProfileInfoRequest;

import { NotFoundError } from "@errors/barrep.error";

export class GetProfileInfoHandler {
  constructor(private dao: IUserDao) {};

  public async handle({ userId }: Request): Promise<UserDto> {
    const exists = await this.dao.obtain({ id: userId });
    if (!exists) throw new NotFoundError("User not found");

    return {
      id: exists.id,
      name: exists.name,
      email: exists.email,
    };
  };
};
