import { api } from "@api/http.facade";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AcceptInvitationResponse } from "../schemas/invitation.schema";

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: number) => 
      api.patch<AcceptInvitationResponse>(`/invitations/${invitationId}/accept`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations", "my"] });
      queryClient.invalidateQueries({ queryKey: ["rooms", "own"] });
    },
  });
};
