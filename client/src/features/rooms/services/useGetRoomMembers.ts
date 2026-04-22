import { api } from "@api/http.facade";
import { useQuery } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { useAuthStore } from "@stores/auth.store";

export type MemberRole = "ADMIN" | "USER";

export interface RoomMember {
  id: number;
  userId: number;
  userName: string;
  userRole: MemberRole;
};

interface GetMembersResponse {
  members: RoomMember[];
};

export const useGetRoomMembers = (roomId: MaybeRefOrGetter<number | null>) => {
  const authStore = useAuthStore();
  
  return useQuery({
    queryKey: computed(() => ["rooms", "members", toValue(roomId)]),
    queryFn: () => api.get<GetMembersResponse>(`/rooms/${toValue(roomId)}/members`),
    select: (data) => data.members,
    enabled: computed(() => authStore.isAuthenticated && toValue(roomId) !== null),
  });
};
