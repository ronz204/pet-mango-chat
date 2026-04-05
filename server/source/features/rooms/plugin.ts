import { Elysia } from "elysia";
import { RoomDao } from "@dal/rooms/room.dao";
import { AuthPlugin } from "@auth/auth.plugin";
import { PrismaPlugin } from "@plugins/prisma.plugin";

import { OwnHandler } from "./own/own.handler";
import { OwnResponse } from "./own/own.schema";

import { LeaveParams } from "./leave/leave.schema";
import { LeaveHandler } from "./leave/leave.handler";
import { LeaveResponse } from "./leave/leave.schema";

import { CreateBody } from "./create/create.schema";
import { CreateHandler } from "./create/create.handler";
import { CreateResponse } from "./create/create.schema";

import { InviteesParams } from "./invitees/invitees.schema";
import { InviteesHandler } from "./invitees/invitees.handler";
import { InviteesResponse } from "./invitees/invitees.schema";

const prefix: string = "/rooms";
const name: string = "rooms.plugin";

export const RoomsPlugin = new Elysia({ name, prefix })
  .use(AuthPlugin)
  .use(PrismaPlugin)
  
  .derive(({ prisma }) => {
    const dao = new RoomDao(prisma);

    return {
      ownH: new OwnHandler(dao),
      leaveH: new LeaveHandler(dao),
      createH: new CreateHandler(dao),
      inviteesH: new InviteesHandler(dao),
    };
  })

  .get("/", async ({ status, userId, ownH }) => {
    const response = await ownH.handle({ userId });
    return status(200, response);
  }, {
    isAuth: true,
    response: {
      200: OwnResponse,
    },
  })

  .post("/new", async ({ status, body, userId, createH }) => {
    const response = await createH.handle({ body, userId });
    return status(200, response);
  }, {
    isAuth: true,
    body: CreateBody,
    response: {
      200: CreateResponse,
    },
  })

  .delete("/:roomId/leave", async ({ status, params, userId, leaveH }) => {
    const response = await leaveH.handle({ params, userId });
    return status(200, response);
  }, {
    isAuth: true,
    params: LeaveParams,
    response: {
      200: LeaveResponse,
    },
  })
  
  .get("/:roomId/invitees", async ({ status, params, inviteesH }) => {
    const response = await inviteesH.handle({ params });
    return status(200, response);
  }, {
    isAuth: true,
    params: InviteesParams,
    response: {
      200: InviteesResponse,
    },
  });
