import { api } from "@api/http.facade";
import { useQuery } from "@tanstack/vue-query";
import { useAuthStore } from "@stores/auth.store";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
};

export const useGetProfile = () => {
  const authStore = useAuthStore();
  
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get<UserProfile>("/profile"),
    staleTime: 5 * 60 * 1000,
    enabled: authStore.isAuthenticated,
  });
};
