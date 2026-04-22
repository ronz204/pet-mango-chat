import { api } from "@api/http.facade";
import { useQuery } from "@tanstack/vue-query";
import { useAuthStore } from "@stores/auth.store";

export interface RoomItem {
  id: number;
  name: string;
};

interface GetMyRoomsResponse {
  rooms: RoomItem[];
};

export const useGetMyRooms = () => {
  const authStore = useAuthStore();
  
  return useQuery({
    queryKey: ["rooms", "own"],
    queryFn: () => api.get<GetMyRoomsResponse>("/rooms/own"),
    select: (data) => data.rooms,
    enabled: authStore.isAuthenticated,
  });
};
