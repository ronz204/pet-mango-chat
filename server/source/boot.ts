import { Elysia } from "elysia";
import { HealthPlugin } from "@plugins/health.plugin";
import { ScalarPlugin } from "@plugins/scalar.plugin";
import { IdentityPlugin } from "@features/identity/plugin";

const app = new Elysia({ prefix: "/api" })
  .use(ScalarPlugin)
  .use(HealthPlugin)
  .use(IdentityPlugin)
  .listen(process.env.PORT!);

const url = `http://${app.server?.hostname}:${app.server?.port}`;
console.log(`🦊 Elysia is running at ${url}`);
