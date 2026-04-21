import { ref, watch, type Ref } from "vue";
import { useMessagesWebSocket } from "./useMessagesWebSocket";
import { usePresenceWebSocket } from "./usePresenceWebSocket";
import { useTypingWebSocket } from "./useTypingWebSocket";
import type { Message } from "../schemas/message.schema";

export interface UseRoomWebSocketsOptions {
  roomId: Ref<number | null>;
  onMessageSent?: () => void;
}

export const useRoomWebSockets = (options: UseRoomWebSocketsOptions) => {
  const { roomId, onMessageSent } = options;

  // State
  const messages = ref<Message[]>([]);
  const onlineUserIds = ref<Set<number>>(new Set());
  const typingUserIds = ref<number[]>([]);
  const isSending = ref(false);

  // WebSocket instances
  const messagesWs = ref<ReturnType<typeof useMessagesWebSocket> | null>(null);
  const presenceWs = ref<ReturnType<typeof usePresenceWebSocket> | null>(null);
  const typingWs = ref<ReturnType<typeof useTypingWebSocket> | null>(null);

  // Computed for connection status
  const isMessagesConnected = ref(false);

  // Setup WebSockets when roomId changes
  watch(roomId, (newRoomId, oldRoomId) => {
    // Cleanup previous connections
    if (oldRoomId) {
      messagesWs.value?.disconnect();
      presenceWs.value?.disconnect();
      typingWs.value?.disconnect();
      messagesWs.value = null;
      presenceWs.value = null;
      typingWs.value = null;
    }

    if (!newRoomId) {
      messages.value = [];
      onlineUserIds.value = new Set();
      typingUserIds.value = [];
      isMessagesConnected.value = false;
      return;
    }

    // Initialize Messages WebSocket
    messagesWs.value = useMessagesWebSocket({
      roomId: newRoomId,
      onMessage: (message) => {
        if (!messages.value.find((m) => m.id === message.id)) {
          messages.value.push(message);
        }
        isSending.value = false;
        onMessageSent?.();
      },
      onConnected: () => {
        console.log("[Messages] Connected");
        isMessagesConnected.value = true;
      },
      onDisconnected: () => {
        console.log("[Messages] Disconnected");
        isMessagesConnected.value = false;
      },
      onError: (error) => {
        console.error("[Messages] Error:", error);
        isSending.value = false;
      },
    });

    // Initialize Presence WebSocket
    presenceWs.value = usePresenceWebSocket({
      roomId: newRoomId,
      onOnlineList: (userIds) => {
        onlineUserIds.value = new Set(userIds);
      },
      onUserOnline: (userId) => {
        onlineUserIds.value.add(userId);
        onlineUserIds.value = new Set(onlineUserIds.value);
      },
      onUserOffline: (userId) => {
        onlineUserIds.value.delete(userId);
        onlineUserIds.value = new Set(onlineUserIds.value);
      },
      onConnected: () => console.log("[Presence] Connected"),
      onDisconnected: () => console.log("[Presence] Disconnected"),
      onError: (error) => console.error("[Presence] Error:", error),
    });

    // Initialize Typing WebSocket
    typingWs.value = useTypingWebSocket({
      roomId: newRoomId,
      onTypingUpdate: (userIds) => {
        typingUserIds.value = userIds;
      },
      onConnected: () => console.log("[Typing] Connected"),
      onDisconnected: () => console.log("[Typing] Disconnected"),
      onError: (error) => console.error("[Typing] Error:", error),
    });

    // Connect all WebSockets
    messagesWs.value?.connect();
    presenceWs.value?.connect();
    typingWs.value?.connect();
  }, { immediate: true });

  // Actions
  const sendMessage = (content: string) => {
    if (!messagesWs.value || !isMessagesConnected.value) {
      console.error("Messages WebSocket not connected");
      return;
    }
    isSending.value = true;
    messagesWs.value.sendMessage(content);
  };

  const sendTypingStart = () => {
    if (typingWs.value?.isConnected) {
      typingWs.value.sendTypingStart();
    }
  };

  const sendTypingStop = () => {
    if (typingWs.value?.isConnected) {
      typingWs.value.sendTypingStop();
    }
  };

  const setMessages = (newMessages: Message[]) => {
    messages.value = [...newMessages];
  };

  return {
    // State
    messages,
    onlineUserIds,
    typingUserIds,
    isSending,
    isMessagesConnected,
    
    // Actions
    sendMessage,
    sendTypingStart,
    sendTypingStop,
    setMessages,
  };
};
