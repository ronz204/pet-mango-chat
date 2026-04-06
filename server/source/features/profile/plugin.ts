import { Elysia } from "elysia";
import { GetProfilePlugin } from "./get-profile/get-profile.plugin";
import { UpdateInfoPlugin } from "./update-info/update-info.plugin";

const prefix: string = "/profile";
const name: string = "profile.plugin";

export const ProfilePlugin = new Elysia({ name, prefix })
  .use(GetProfilePlugin).use(UpdateInfoPlugin);

