import { api } from "@api/http.facade";
import { useQuery } from "@tanstack/vue-query";
import { useAuthStore } from "@stores/auth.store";
import type { GetMyInvitationsResponse } from "../schemas/invitation.schema";

export const useGetMyInvitations = () => {
  const authStore = useAuthStore();
  
  return useQuery({
    queryKey: ["invitations", "my"],
    queryFn: () => api.get<GetMyInvitationsResponse>("/invitations/my"),
    select: (data) => data.invitations,
    enabled: authStore.isAuthenticated,
  });
};
