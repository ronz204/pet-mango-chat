import type { SendMessageResponse } from "./send-message.schema";
import { Create } from "@dal/message/queries/create.query";

export class SendMessageMapper {
  public static toResponse(message: Create.Result): SendMessageResponse {
    return {
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      senderName: message.sender.name,
      timestamp: message.createdAt.toISOString(),
    };
  };
};
