import { Elysia } from "elysia";
import { CorsPlugin } from "@plugins/cors.plugin";
import { ErrorsPlugin } from "@plugins/errors.plugin";
import { HealthPlugin } from "@plugins/health.plugin";
import { ScalarPlugin } from "@plugins/scalar.plugin";

import { RoomsPlugin } from "@features/rooms/plugin";
import { ProfilePlugin } from "@features/profile/plugin";
import { IdentityPlugin } from "@features/identity/plugin";
import { InvitationsPlugin } from "@features/invites/plugin";

const app = new Elysia({ prefix: "/api" })
  .use(CorsPlugin)
  .use(ScalarPlugin)
  .use(HealthPlugin)
  .use(ErrorsPlugin)
  .use(IdentityPlugin)
  .use(ProfilePlugin)
  .use(RoomsPlugin)
  .use(InvitationsPlugin)
  .listen(process.env.PORT!);

const url = `http://${app.server?.hostname}:${app.server?.port}`;
console.log(`🦊 Elysia is running at ${url}`);
