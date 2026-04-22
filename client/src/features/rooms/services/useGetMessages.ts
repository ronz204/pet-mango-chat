import { api } from "@api/http.facade";
import { useQuery } from "@tanstack/vue-query";
import { computed, type MaybeRefOrGetter, toValue } from "vue";
import { useAuthStore } from "@stores/auth.store";
import type { Message } from "../schemas/message.schema";

export interface GetMessagesResponse {
  messages: Message[];
}

export const useGetMessages = (roomId: MaybeRefOrGetter<number | null>) => {
  const authStore = useAuthStore();
  
  return useQuery({
    queryKey: computed(() => ["rooms", toValue(roomId), "messages"]),
    queryFn: () => api.get<GetMessagesResponse>(`/rooms/${toValue(roomId)}/messages`),
    enabled: computed(() => authStore.isAuthenticated && toValue(roomId) !== null),
    select: (data) => data.messages,
  });
};
