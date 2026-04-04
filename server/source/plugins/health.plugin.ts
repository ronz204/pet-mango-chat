import { Elysia } from "elysia";

export const HealthPlugin = new Elysia({ name: "health.plugin" })
  .get("/health", () => ({ status: "healthy", service: "mango" }));
