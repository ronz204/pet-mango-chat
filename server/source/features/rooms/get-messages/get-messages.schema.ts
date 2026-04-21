import { t, type Static } from "elysia";
import { MessageDto } from "@dal/message/message.dto";

export const GetMessagesQuery = t.Object({
  limit: t.Number({ default: 100 }),
  offset: t.Number({ default: 0 }),
});

export const GetMessagesParams = t.Object({
  roomId: t.Number(),
});

export const GetMessagesRequest = t.Object({
  query: GetMessagesQuery,
  params: GetMessagesParams,
});

export const GetMessagesResponse = t.Object({
  messages: t.Array(MessageDto),
});

export type GetMessagesRequest = Static<typeof GetMessagesRequest>;
export type GetMessagesResponse = Static<typeof GetMessagesResponse>;
