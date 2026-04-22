import { api } from "@api/http.facade";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { DeclineInvitationResponse } from "../schemas/invitation.schema";

export const useDeclineInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: number) => 
      api.patch<DeclineInvitationResponse>(`/invitations/${invitationId}/decline`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations", "my"] });
    },
  });
};
