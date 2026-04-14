import { api } from "@api/http.facade";
import { useQuery } from "@tanstack/vue-query";
import { computed, type MaybeRefOrGetter, toValue } from "vue";

export interface RoomDetails {
  id: number;
  name: string;
};

export const useGetRoomDetails = (roomId: MaybeRefOrGetter<number | null>) => {
  return useQuery({
    queryKey: computed(() => ["rooms", "details", toValue(roomId)]),
    queryFn: () => api.get<RoomDetails>(`/rooms/${toValue(roomId)}`),
    enabled: computed(() => toValue(roomId) !== null),
  });
};
