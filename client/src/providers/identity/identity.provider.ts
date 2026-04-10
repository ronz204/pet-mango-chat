import { api } from "@api/http.facade";
import type { AuthResponse } from "./identity.types";
import type { SignInRequest } from "@schemas/signin.schema";
import type { SignUpRequest } from "@schemas/signup.schema";

export class IdentityProvider {
  public static async signIn(data: SignInRequest): Promise<AuthResponse> {
    return api.post<AuthResponse>("/auth/signin", { body: data });
  };

  public static async signUp(data: SignUpRequest): Promise<AuthResponse> {
    return api.post<AuthResponse>("/auth/signup", { body: data });
  };
};
