import { api } from "@api/http.facade";
import { useQuery } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { useAuthStore } from "@stores/auth.store";
import type { GetEligibleInviteesResponse } from "../schemas/invitation.schema";

export const useGetEligibleInvitees = (roomId: MaybeRefOrGetter<number | null>) => {
  const authStore = useAuthStore();
  
  return useQuery({
    queryKey: computed(() => ["invitations", "eligibles", toValue(roomId)]),
    queryFn: () => api.get<GetEligibleInviteesResponse>(`/invitations/${toValue(roomId)}/eligibles`),
    select: (data) => data.users,
    enabled: computed(() => authStore.isAuthenticated && toValue(roomId) !== null),
  });
};
