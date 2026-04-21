import { api } from "@api/http.facade";
import { useQuery } from "@tanstack/vue-query";
import { computed, type MaybeRefOrGetter, toValue } from "vue";
import type { Message } from "../schemas/message.schema";

export interface GetMessagesResponse {
  messages: Message[];
}

export const useGetMessages = (roomId: MaybeRefOrGetter<number | null>) => {
  return useQuery({
    queryKey: computed(() => ["rooms", toValue(roomId), "messages"]),
    queryFn: () => api.get<GetMessagesResponse>(`/rooms/${toValue(roomId)}/messages`),
    enabled: computed(() => toValue(roomId) !== null),
    select: (data) => data.messages,
  });
};
