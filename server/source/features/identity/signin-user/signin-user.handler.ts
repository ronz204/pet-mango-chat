import type { IUserDao } from "@dal/users/user.idao";
import type { SignInUserRequest } from "./signin-user.schema";
import type { SignInUserPayload } from "./signin-user.schema";

type Request = SignInUserRequest;
type Payload = SignInUserPayload;

import { AuthMapper } from "@auth/auth.mapper";
import { NotFoundError, ConflictError } from "@errors/barrep.error";

export class SignInUserHandler {
  constructor(private dao: IUserDao) {};

  public async handle({ body }: Request): Promise<Payload> {
    const exists = await this.dao.obtain(body);
    if (!exists) throw new NotFoundError("User not found");

    const isValid = await this.verify({ body }, exists.password);
    if (!isValid) throw new ConflictError("Invalid password");

    return AuthMapper.toResponse(exists);
  };

  private async verify({ body }: Request, hashed: string): Promise<boolean> {
    return await Bun.password.verify(body.password, hashed);
  };
};
