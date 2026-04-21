import type { RedisClient } from "bun";

import type {
  ITypingCache,
  StartArgs,
  StopArgs,
  GetTypingArgs,
} from "./typing.icache";

export class TypingCache implements ITypingCache {
  private readonly PREFIX = "room";
  private readonly GHOST_TTL_MS = 5_000;

  constructor(private redis: RedisClient) {};

  private getKey(roomId: number): string {
    return `${this.PREFIX}:${roomId}:typing`;
  };

  private get ghostCutoff(): number {
    return Date.now() - this.GHOST_TTL_MS;
  };

  public async start({ roomId, userId }: StartArgs): Promise<void> {
    const key = this.getKey(roomId);
    await this.redis.zadd(key, Date.now(), String(userId));
  };

  public async stop({ roomId, userId }: StopArgs): Promise<void> {
    const key = this.getKey(roomId);
    await this.redis.zrem(key, String(userId));
  };

  public async getTyping({ roomId }: GetTypingArgs): Promise<number[]> {
    const key = this.getKey(roomId);

    await this.redis.zremrangebyscore(key, "-inf", String(this.ghostCutoff));

    const members = await this.redis.zrange(key, 0, -1);
    return members.map(Number);
  };
};
