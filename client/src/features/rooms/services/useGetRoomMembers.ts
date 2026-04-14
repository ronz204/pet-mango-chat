import { api } from "@api/http.facade";
import { useQuery } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRefOrGetter } from "vue";

export type MemberRole = "ADMIN" | "USER";

export interface RoomMember {
  id: number;
  userId: number;
  userName: string;
  role: MemberRole;
};

interface GetMembersResponse {
  members: RoomMember[];
};

export const useGetRoomMembers = (roomId: MaybeRefOrGetter<number | null>) => {
  return useQuery({
    queryKey: computed(() => ["rooms", "members", toValue(roomId)]),
    queryFn: () => api.get<GetMembersResponse>(`/rooms/${toValue(roomId)}/members`),
    select: (data) => data.members,
    enabled: computed(() => toValue(roomId) !== null),
  });
};
