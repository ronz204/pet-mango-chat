import { api } from "@api/http.facade";
import { useQuery } from "@tanstack/vue-query";

export interface RoomItem {
  id: number;
  name: string;
};

interface GetMyRoomsResponse {
  rooms: RoomItem[];
};

export const useGetMyRooms = () => {
  return useQuery({
    queryKey: ["rooms", "own"],
    queryFn: () => api.get<GetMyRoomsResponse>("/rooms/own"),
    select: (data) => data.rooms,
  });
};
