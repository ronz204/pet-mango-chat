import { api } from "@api/http.facade";
import { useRouter } from "vue-router";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

interface LeaveRoomResponse {
  success: boolean;
  message: string;
}

export const useLeaveRoom = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomId: number) =>
      api.post<LeaveRoomResponse>(`/rooms/${roomId}/leave`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms", "own"] });
      router.push("/rooms");
    },
  });
};
