import type { IUserDao } from "@dal/users/user.idao";
import type { SignUpRequest } from "./signup.schema";
import type { SignUpPayload } from "./signup.schema";

export class SignUpHandler {
  constructor(private dao: IUserDao) {};

  public async handle(req: SignUpRequest): Promise<SignUpPayload> {
    const exists = await this.dao.obtain(req.body);
    if (exists) throw new Error("User already exists");

    const hashed = await this.hash(req);
    const created = await this.dao.create({
      ...req.body, password: hashed });

    return { userId: created.id };
  };

  private async hash(req: SignUpRequest): Promise<string> {
    return await Bun.password.hash(req.body.password);
  };
};
