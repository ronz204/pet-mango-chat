import type { RedisClient } from "bun";
import type { MessageDto } from "@dal/message/message.dto";

import type {
  IMessageCache, DropperArgs,
  GetterArgs, SetterArgs, PusherArgs,
} from "./message.icache";

export class MessageCache implements IMessageCache {
  private readonly CACHE_TTL = 300;
  private readonly CACHE_MAX = 100;
  private readonly PREFIX = "room";

  constructor(private redis: RedisClient) { };

  private getKey(roomId: number): string {
    return `${this.PREFIX}:${roomId}:messages`;
  };

  public async getter({ roomId, limit, offset }: GetterArgs): Promise<MessageDto[]> {
    if (offset !== 0) return [];

    const key = this.getKey(roomId);
    const end = Math.min(limit, this.CACHE_MAX) - 1;
    const cached = await this.redis.lrange(key, 0, end);

    if (cached.length === 0) return [];
    return cached.map((item) => JSON.parse(item));
  };

  public async setter({ roomId, messages }: SetterArgs): Promise<void> {
    if (messages.length === 0) return;

    const key = this.getKey(roomId);
    await this.redis.del(key);

    const serialized = messages.map(msg => JSON.stringify(msg));
    await this.redis.rpush(key, ...serialized as [string, ...string[]]);

    await Promise.all([
      this.redis.ltrim(key, -this.CACHE_MAX, -1),
      this.redis.expire(key, this.CACHE_TTL),
    ]);
  };

  public async dropper({ roomId }: DropperArgs): Promise<void> {
    const key = this.getKey(roomId);
    await this.redis.del(key);
  };

  public async pusher({ roomId, message }: PusherArgs): Promise<void> {
    const key = this.getKey(roomId);
    const serialized = JSON.stringify(message);

    await Promise.all([
      this.redis.rpush(key, serialized),
      this.redis.ltrim(key, -this.CACHE_MAX, -1),
      this.redis.expire(key, this.CACHE_TTL),
    ]);
  };
};