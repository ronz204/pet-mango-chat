import type { IMessageDao } from "@dal/message/message.idao";
import type { GetMessagesRequest } from "./get-messages.schema";
import type { GetMessagesResponse } from "./get-messages.schema";
import type { IMessageCache } from "@cache/message/message.icache";

type Request = GetMessagesRequest;
type Response = GetMessagesResponse;

import { NotFoundError } from "@errors/barrep.error";
import { GetMessagesMapper } from "./get-messages.mapper";

export class GetMessagesHandler {
  constructor(
    private dao: IMessageDao,
    private cache: IMessageCache) {};

  public async handle({ params, query }: Request): Promise<Response> {
    const { roomId } = params;
    const { limit, offset } = query;

    const cached = await this.cache.getter({ roomId, limit, offset });
    if (cached.length > 0) return { messages: cached };

    const messages = await this.dao.read({ roomId, limit, offset });
    if (!messages) throw new NotFoundError("No messages found");

    const mapped = GetMessagesMapper.toResponse(messages);
    if (offset === 0) await this.cache.setter({ roomId, ...mapped });
    
    return mapped;
  };
};
