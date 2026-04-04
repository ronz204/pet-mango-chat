import { Elysia } from "elysia";
import { UserDao } from "@dal/users/user.dao";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";

import { ObtainHandler } from "./obtain/obtain.handler";
import { ObtainResponse } from "./obtain/obtain.schema";

import { RefreshBody } from "./refresh/refresh.schema";
import { RefreshHandler } from "./refresh/refresh.handler";
import { RefreshResponse } from "./refresh/refresh.schema";

const prefix: string = "/profile";
const name: string = "profile.plugin";

export const ProfilePlugin = new Elysia({ name, prefix })
  .use(AuthPlugin)
  .use(PrismaPlugin)
  
  .derive(({ prisma }) => {
    const dao = new UserDao(prisma);

    return {
      obtainH: new ObtainHandler(dao),
      refreshH: new RefreshHandler(dao),
    };
  })
  
  .get("/", async ({ status, userId, obtainH }) => {
    const response = await obtainH.handle({ userId });
    return status(200, response);
  }, {
    isAuth: true,
    response: {
      200: ObtainResponse
    },
  })
  
  .patch("/", async ({ status, userId, body, refreshH }) => {
    const response = await refreshH.handle({ userId, body });
    return status(200, response);
  }, {
    isAuth: true,
    body: RefreshBody,
    response: {
      200: RefreshResponse
    },
  });
