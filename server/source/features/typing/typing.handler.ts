import type { ITypingCache } from "@cache/typing/typing.icache";
import type { OnMessageArgs, OnCloseArgs } from "./typing.schema";

export class TypingHandler {
  constructor(private cache: ITypingCache) {};

  public async onMessage({ roomId, userId, event }: OnMessageArgs): Promise<number[]> {
    if (event === "typing:start") {
      await this.cache.start({ roomId, userId });
    } else {
      await this.cache.stop({ roomId, userId });
    };

    return this.cache.getTyping({ roomId });
  };

  public async onClose({ roomId, userId }: OnCloseArgs): Promise<number[]> {
    await this.cache.stop({ roomId, userId });
    return this.cache.getTyping({ roomId });
  };
};
