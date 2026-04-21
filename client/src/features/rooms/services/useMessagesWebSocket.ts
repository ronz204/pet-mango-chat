import { useWebSocket } from "@hooks/useWebSocket";
import type { Message, MessageEvent, SendMessageEvent } from "../schemas/message.schema";
import type { Ref } from "vue";

export interface UseMessagesWebSocketOptions {
  roomId: number;
  onMessage?: (message: Message) => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
  onError?: (error: Event) => void;
}

export interface UseMessagesWebSocketReturn {
  ws: Ref<WebSocket | null>;
  isConnected: Ref<boolean>;
  isConnecting: Ref<boolean>;
  connect: () => void;
  disconnect: () => void;
  sendMessage: (content: string) => void;
}

export const useMessagesWebSocket = (options: UseMessagesWebSocketOptions): UseMessagesWebSocketReturn => {
  const { roomId, onMessage, onConnected, onDisconnected, onError } = options;

  const baseWs = useWebSocket({
    onOpen: onConnected,
    onClose: onDisconnected,
    onError,
    onMessage: (event) => {
      try {
        const data: MessageEvent = JSON.parse(event.data);
        
        if (data.event === "message:sent" || data.event === "message:new") {
          const message: Message = {
            id: data.id,
            content: data.content,
            senderId: data.senderId,
            senderName: data.senderName,
            timestamp: data.timestamp,
          };
          onMessage?.(message);
        }
      } catch (error) {
        console.error("[MessagesWS] Failed to parse message:", error);
      }
    },
  });

  const buildUrl = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    const wsUrl = apiUrl.replace(/^http/, "ws");
    const token = localStorage.getItem("mango:token");
    return `${wsUrl}/rooms/messages/${roomId}?token=${token}`;
  };

  const connect = () => {
    const url = buildUrl();
    baseWs.connect(url);
  };

  const sendMessage = (content: string) => {
    const event: SendMessageEvent = {
      event: "message:send",
      content,
    };
    baseWs.send(JSON.stringify(event));
  };

  return {
    ws: baseWs.ws,
    isConnected: baseWs.isConnected as Ref<boolean>,
    isConnecting: baseWs.isConnecting as Ref<boolean>,
    connect,
    disconnect: baseWs.disconnect,
    sendMessage,
  };
};
