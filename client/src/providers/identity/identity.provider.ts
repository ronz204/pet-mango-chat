import { BaseProvider } from "@providers/base.provider";

import type {
  SignInRequest,
  SignUpRequest,
} from "./identity.types";

export class IdentityProvider extends BaseProvider {
  public async signIn(req: SignInRequest) {
    console.log(req);
  };

  public async signUp(req: SignUpRequest) {
    console.log(req);
  };
};
