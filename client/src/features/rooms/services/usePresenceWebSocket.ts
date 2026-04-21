import { useWebSocket } from "@hooks/useWebSocket";
import type { PresenceEvent } from "../schemas/presence.schema";
import type { Ref } from "vue";

export interface UsePresenceWebSocketOptions {
  roomId: number;
  onOnlineList?: (userIds: number[]) => void;
  onUserOnline?: (userId: number) => void;
  onUserOffline?: (userId: number) => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
  onError?: (error: Event) => void;
}

export interface UsePresenceWebSocketReturn {
  ws: Ref<WebSocket | null>;
  isConnected: Ref<boolean>;
  isConnecting: Ref<boolean>;
  connect: () => void;
  disconnect: () => void;
}

export const usePresenceWebSocket = (options: UsePresenceWebSocketOptions): UsePresenceWebSocketReturn => {
  const { roomId, onOnlineList, onUserOnline, onUserOffline, onConnected, onDisconnected, onError } = options;

  const baseWs = useWebSocket({
    onOpen: onConnected,
    onClose: onDisconnected,
    onError,
    onMessage: (event) => {
      try {
        const data: PresenceEvent = JSON.parse(event.data);
        
        if (data.event === "online:list") {
          onOnlineList?.(data.userIds);
        } else if (data.event === "user:online") {
          onUserOnline?.(data.userId);
        } else if (data.event === "user:offline") {
          onUserOffline?.(data.userId);
        }
      } catch (error) {
        console.error("[PresenceWS] Failed to parse message:", error);
      }
    },
  });

  const buildUrl = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    const wsUrl = apiUrl.replace(/^http/, "ws");
    const token = localStorage.getItem("mango:token");
    return `${wsUrl}/presence/${roomId}?token=${token}`;
  };

  const connect = () => {
    const url = buildUrl();
    baseWs.connect(url);
  };

  return {
    ws: baseWs.ws,
    isConnected: baseWs.isConnected as Ref<boolean>,
    isConnecting: baseWs.isConnecting as Ref<boolean>,
    connect,
    disconnect: baseWs.disconnect,
  };
};
