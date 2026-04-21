import { Elysia } from "elysia";
import { GetProfileInfoPlugin } from "./get-profile-info/get-profile-info.plugin";
import { UpdateBasicInfoPlugin } from "./update-basic-info/update-basic-info.plugin";

const prefix: string = "/profile";
const name: string = "profile.plugin";

export const ProfilePlugin = new Elysia({ name, prefix })
  .use(GetProfileInfoPlugin)
  .use(UpdateBasicInfoPlugin);
