import { api } from "@api/http.facade";
import { useRouter } from "vue-router";
import { useMutation } from "@tanstack/vue-query";
import { useAuthStore } from "@stores/auth.store";

import type { RegisterPayload } from "../schemas/register.schema";

export const useAuthRegister = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterPayload) =>
      api.post<{ token: string }>("/auth/signup", { body: data }),
    onSuccess: ({ token }) => {
      authStore.setAuthToken(token);
      router.push("/");
    },
  });
};
