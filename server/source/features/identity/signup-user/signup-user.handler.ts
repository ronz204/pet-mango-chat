import type { IUserDao } from "@dal/users/user.idao";
import type { SignUpUserRequest } from "./signup-user.schema";
import type { SignUpUserPayload } from "./signup-user.schema";

type Request = SignUpUserRequest;
type Payload = SignUpUserPayload;

import { AuthMapper } from "@auth/auth.mapper";
import { NotFoundError } from "@errors/barrep.error";

export class SignUpUserHandler {
  constructor(private dao: IUserDao) {};

  public async handle({ body }: Request): Promise<Payload> {
    const exists = await this.dao.obtain(body);
    if (exists) throw new NotFoundError("User already exists");

    const hashed = await this.hash({ body });
    const created = await this.dao.create({
      ...body, password: hashed,});

    return AuthMapper.toResponse(created);
  };

  private async hash({ body }: Request): Promise<string> {
    return await Bun.password.hash(body.password);
  };
};
