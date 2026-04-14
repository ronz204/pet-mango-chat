import { api } from "@api/http.facade";
import { useQuery } from "@tanstack/vue-query";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get<UserProfile>("/profile"),
    staleTime: 5 * 60 * 1000,
  });
};
