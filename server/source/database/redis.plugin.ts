import { Elysia } from "elysia";
import { RedisClient } from "bun";

const name: string = "redis.plugin";
const url = process.env.REDIS_URL ?? "";

export const RedisPlugin = new Elysia({ name })
  .decorate("redis", new RedisClient(url));