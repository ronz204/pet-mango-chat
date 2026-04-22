import { api } from "@api/http.facade";
import { useQuery } from "@tanstack/vue-query";
import { computed, type MaybeRefOrGetter, toValue } from "vue";
import { useAuthStore } from "@stores/auth.store";

export interface RoomDetails {
  id: number;
  name: string;
};

export const useGetRoomDetails = (roomId: MaybeRefOrGetter<number | null>) => {
  const authStore = useAuthStore();
  
  return useQuery({
    queryKey: computed(() => ["rooms", "details", toValue(roomId)]),
    queryFn: () => api.get<RoomDetails>(`/rooms/${toValue(roomId)}`),
    enabled: computed(() => authStore.isAuthenticated && toValue(roomId) !== null),
  });
};
