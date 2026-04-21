import type { RedisClient } from "bun";

import type {
  IPresenceCache,
  AddArgs,
  RemoveArgs,
  GetOnlineArgs,
} from "./presence.icache";

export class PresenceCache implements IPresenceCache {
  private readonly PREFIX = "room";

  constructor(private redis: RedisClient) {};

  private getKey(roomId: number): string {
    return `${this.PREFIX}:${roomId}:online`;
  };

  public async add({ roomId, userId }: AddArgs): Promise<void> {
    await this.redis.sadd(this.getKey(roomId), String(userId));
  };

  public async remove({ roomId, userId }: RemoveArgs): Promise<void> {
    await this.redis.srem(this.getKey(roomId), String(userId));
  };

  public async getOnline({ roomId }: GetOnlineArgs): Promise<number[]> {
    const members = await this.redis.smembers(this.getKey(roomId));
    return members.map(Number);
  };
};
