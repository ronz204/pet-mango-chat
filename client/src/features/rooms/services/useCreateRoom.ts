import { api } from "@api/http.facade";
import { useRouter } from "vue-router";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

import type { CreateRoomSchema } from "../schemas/create-room.schema";

interface CreateRoomResponse {
  id: number;
  name: string;
}

export const useCreateRoom = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoomSchema) =>
      api.post<CreateRoomResponse>("/rooms", { body: data }),
    onSuccess: (room) => {
      queryClient.invalidateQueries({ queryKey: ["rooms", "own"] });
      router.push(`/rooms/${room.id}`);
    },
  });
};
