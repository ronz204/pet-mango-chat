import { Elysia } from "elysia";
import { LeaveRoomPlugin } from "./leave-room/leave-room.plugin";
import { CreateRoomPlugin } from "./create-room/create-room.plugin";
import { GetMyRoomsPlugin } from "./get-my-rooms/get-my-rooms.plugin";
import { GetMembersPlugin } from "./get-members/get-members.plugin";
import { SendMessagePlugin } from "./send-message/send-message.plugin";

const prefix: string = "/rooms";
const name: string = "rooms.plugin";

export const RoomsPlugin = new Elysia({ name, prefix })
  .use(LeaveRoomPlugin)
  .use(CreateRoomPlugin)
  .use(GetMyRoomsPlugin)
  .use(GetMembersPlugin)
  .use(SendMessagePlugin);
