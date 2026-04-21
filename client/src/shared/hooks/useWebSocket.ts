import { ref, onUnmounted, type Ref } from "vue";

export interface UseWebSocketOptions {
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  onMessage?: (event: MessageEvent) => void;
  autoConnect?: boolean;
}

export interface UseWebSocketReturn {
  ws: Ref<WebSocket | null>;
  isConnected: Ref<boolean>;
  isConnecting: Ref<boolean>;
  connect: (url: string) => void;
  disconnect: () => void;
  send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void;
}

export const useWebSocket = (options: UseWebSocketOptions = {}): UseWebSocketReturn => {
  const { onOpen, onClose, onError, onMessage } = options;

  const ws = ref<WebSocket | null>(null);
  const isConnected = ref(false);
  const isConnecting = ref(false);

  const connect = (url: string) => {
    if (ws.value?.readyState === WebSocket.OPEN) {
      console.warn("[WebSocket] Already connected");
      return;
    }

    if (ws.value?.readyState === WebSocket.CONNECTING) {
      console.warn("[WebSocket] Connection in progress");
      return;
    }

    isConnecting.value = true;
    ws.value = new WebSocket(url);

    ws.value.onopen = () => {
      isConnected.value = true;
      isConnecting.value = false;
      onOpen?.();
    };

    ws.value.onclose = () => {
      isConnected.value = false;
      isConnecting.value = false;
      onClose?.();
    };

    ws.value.onerror = (error) => {
      onError?.(error);
    };

    ws.value.onmessage = (event) => {
      onMessage?.(event);
    };
  };

  const disconnect = () => {
    if (ws.value) {
      ws.value.close();
      ws.value = null;
      isConnected.value = false;
      isConnecting.value = false;
    }
  };

  const send = (data: string | Blob | ArrayBufferLike | ArrayBufferView) => {
    if (!ws.value || ws.value.readyState !== WebSocket.OPEN) {
      console.error("[WebSocket] Cannot send: not connected");
      return;
    }
    ws.value.send(data as string | Blob | BufferSource);
  };

  // Auto cleanup on unmount
  onUnmounted(() => {
    disconnect();
  });

  return {
    ws,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    send,
  };
};
