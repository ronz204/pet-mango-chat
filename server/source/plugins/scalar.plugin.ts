import { Elysia } from "elysia";
import openapi from "@elysiajs/openapi";

export const ScalarPlugin = new Elysia({ name: "scalar.plugin" })
  .use(openapi({
    path: "/scalar",
    documentation: {
      info: {
        title: "Mango API",
        version: "1.0.0",
      },
    },
  }));
