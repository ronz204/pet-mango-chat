export interface Message {
  id: number;
  content: string;
  senderId: number;
  senderName: string;
  timestamp: string;
}

export interface SendMessageEvent {
  event: "message:send";
  content: string;
}

export interface MessageSentEvent {
  event: "message:sent";
  id: number;
  content: string;
  senderId: number;
  senderName: string;
  timestamp: string;
}

export interface MessageNewEvent {
  event: "message:new";
  id: number;
  content: string;
  senderId: number;
  senderName: string;
  timestamp: string;
}

export type MessageEvent = MessageSentEvent | MessageNewEvent;
