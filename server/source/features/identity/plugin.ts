import { Elysia } from "elysia";
import { UserDao } from "@dal/users/user.dao";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";

import { SignUpBody } from "./signup/signup.schema";
import { SignUpHandler } from "./signup/signup.handler";
import { SignUpResponse } from "./signup/signup.schema";

const prefix: string = "/auth";
const name: string = "identity.plugin";

export const IdentityPlugin = new Elysia({ name, prefix })
  .use(AuthPlugin)
  .use(PrismaPlugin)
  
  .derive(({ prisma }) => {
    const dao = new UserDao(prisma);
    
    return {
      signUpH: new SignUpHandler(dao)
    };
  })
  
  .post("/signup", async ({ status, body, jwt, signUpH }) => {
    const response = await signUpH.handle({ body });
    const token = await jwt.sign(response);
    return status(200, { token });
  }, {
    body: SignUpBody,
    response: {
      200: SignUpResponse,
    },
  });
