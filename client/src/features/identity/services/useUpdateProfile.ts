import { api } from "@api/http.facade";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

import type { UpdateProfileSchema } from "../schemas/update-profile.schema";

interface UpdateProfileResponse {
  id: number;
  name: string;
  email: string;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileSchema) =>
      api.patch<UpdateProfileResponse>("/profile", { body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
