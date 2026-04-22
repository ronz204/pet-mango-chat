import { api } from "@api/http.facade";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { CreateInvitationBody, CreateInvitationResponse } from "../schemas/invitation.schema";

export const useCreateInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvitationBody) => 
      api.post<CreateInvitationResponse>("/invitations", { body: data }),
    onSuccess: (_, variables) => {
      // Invalidate eligible invitees for the room
      queryClient.invalidateQueries({ queryKey: ["invitations", "eligibles", variables.roomId] });
    },
  });
};
