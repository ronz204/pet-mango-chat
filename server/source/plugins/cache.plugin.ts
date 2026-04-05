import { Elysia } from "elysia";
import { RedisClient } from "bun";

const name: string = "cache.plugin";
const url = process.env.REDIS_URL ?? "";

export const CachePlugin = new Elysia({ name })
  .decorate("cache", new RedisClient(url));
