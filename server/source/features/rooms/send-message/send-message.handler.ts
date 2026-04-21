import type { IMessageDao } from "@dal/message/message.idao";
import type { IMessageCache } from "@cache/message/message.icache";
import type { OnMessageArgs, SendMessageResponse } from "./send-message.schema";

import { SendMessageMapper } from "./send-message.mapper";

export class SendMessageHandler {
  constructor(
    private dao: IMessageDao,
    private cache: IMessageCache) {};

  public async onMessage({ roomId, userId, content }: OnMessageArgs): Promise<SendMessageResponse> {
    const message = await this.dao.create({ roomId, content, senderId: userId });
    const mapped = SendMessageMapper.toResponse(message);
    await this.cache.pusher({ roomId, message: mapped });
    return mapped;
  };
};
