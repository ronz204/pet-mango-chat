import { Elysia } from "elysia";
import { LeaveRoomPlugin } from "./leave-room/leave-room.plugin";
import { CreateRoomPlugin } from "./create-room/create-room.plugin";
import { GetMyRoomsPlugin } from "./get-my-rooms/get-my-rooms.plugin";
import { GetRoomDetailsPlugin } from "./get-room-details/get-room-details.plugin";

const prefix: string = "/rooms";
const name: string = "rooms.plugin";

export const RoomsPlugin = new Elysia({ name, prefix })
  .use(LeaveRoomPlugin)
  .use(CreateRoomPlugin)
  .use(GetMyRoomsPlugin)
  .use(GetRoomDetailsPlugin);
