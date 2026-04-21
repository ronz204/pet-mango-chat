import { useWebSocket } from "@hooks/useWebSocket";
import type { TypingEvent, TypingMessage } from "../schemas/typing.schema";
import type { Ref } from "vue";

export interface UseTypingWebSocketOptions {
  roomId: number;
  onTypingUpdate?: (userIds: number[]) => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
  onError?: (error: Event) => void;
}

export interface UseTypingWebSocketReturn {
  ws: Ref<WebSocket | null>;
  isConnected: Ref<boolean>;
  isConnecting: Ref<boolean>;
  connect: () => void;
  disconnect: () => void;
  sendTypingStart: () => void;
  sendTypingStop: () => void;
}

export const useTypingWebSocket = (options: UseTypingWebSocketOptions): UseTypingWebSocketReturn => {
  const { roomId, onTypingUpdate, onConnected, onDisconnected, onError } = options;

  const baseWs = useWebSocket({
    onOpen: onConnected,
    onClose: onDisconnected,
    onError,
    onMessage: (event) => {
      try {
        const data: TypingEvent = JSON.parse(event.data);
        
        if (data.event === "typing:update") {
          onTypingUpdate?.(data.userIds);
        }
      } catch (error) {
        console.error("[TypingWS] Failed to parse message:", error);
      }
    },
  });

  const buildUrl = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    const wsUrl = apiUrl.replace(/^http/, "ws");
    const token = localStorage.getItem("mango:token");
    return `${wsUrl}/typing/${roomId}?token=${token}`;
  };

  const connect = () => {
    const url = buildUrl();
    baseWs.connect(url);
  };

  const sendTypingStart = () => {
    const message: TypingMessage = { event: "typing:start" };
    baseWs.send(JSON.stringify(message));
  };

  const sendTypingStop = () => {
    const message: TypingMessage = { event: "typing:stop" };
    baseWs.send(JSON.stringify(message));
  };

  return {
    ws: baseWs.ws,
    isConnected: baseWs.isConnected as Ref<boolean>,
    isConnecting: baseWs.isConnecting as Ref<boolean>,
    connect,
    disconnect: baseWs.disconnect,
    sendTypingStart,
    sendTypingStop,
  };
};
