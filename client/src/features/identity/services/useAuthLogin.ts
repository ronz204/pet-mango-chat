import { api } from "@api/http.facade";
import { useRouter } from "vue-router";
import { useMutation } from "@tanstack/vue-query";
import { useAuthStore } from "@stores/auth.store";

import type { LoginSchema } from "../schemas/login.schema";

export const useAuthLogin = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginSchema) =>
      api.post<{ token: string }>("/auth/signin", { body: data }),
    onSuccess: ({ token }) => {
      authStore.setAuthToken(token);
      router.push("/");
    },
  });
};
