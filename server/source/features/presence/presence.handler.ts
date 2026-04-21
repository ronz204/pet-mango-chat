import type { OnOpenArgs } from "./presence.schema";
import type { OnCloseArgs } from "./presence.schema";
import type { IPresenceCache } from "@cache/presence/presence.icache";

export class PresenceHandler {
  constructor(private cache: IPresenceCache) {};

  public async onOpen({ roomId, userId }: OnOpenArgs): Promise<number[]> {
    await this.cache.add({ roomId, userId });
    return this.cache.getOnline({ roomId });
  };

  public async onClose({ roomId, userId }: OnCloseArgs): Promise<void> {
    await this.cache.remove({ roomId, userId });
  };
};
