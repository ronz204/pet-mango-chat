import { Elysia } from "elysia";
import { SignInUserPlugin } from "./signin-user/signin-user.plugin";
import { SignUpUserPlugin } from "./signup-user/signup-user.plugin";

const prefix: string = "/auth";
const name: string = "identity.plugin";

export const IdentityPlugin = new Elysia({ name, prefix })
  .use(SignInUserPlugin)
  .use(SignUpUserPlugin);
