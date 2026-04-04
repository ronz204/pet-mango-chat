import type { IUserDao } from "@dal/users/user.idao";
import type { SignInRequest } from "./signin.schema";
import type { SignInPayload } from "./signin.schema";

export class SignInHandler {
  constructor(private dao: IUserDao) {};

  public async handle(req: SignInRequest): Promise<SignInPayload> {
    const exists = await this.dao.obtain(req.body);
    if (!exists) throw new Error("User does not exist");

    const isValid = await this.verify(req, exists.password);
    if (!isValid) throw new Error("Invalid password");

    return { userId: exists.id };
  };

  private async verify(req: SignInRequest, hashed: string): Promise<boolean> {
    return await Bun.password.verify(req.body.password, hashed);
  };
};
