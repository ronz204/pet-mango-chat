export interface TypingStartEvent {
  event: "typing:start";
}

export interface TypingStopEvent {
  event: "typing:stop";
}

export interface TypingUpdateEvent {
  event: "typing:update";
  userIds: number[];
}

export type TypingEvent = TypingUpdateEvent;
export type TypingMessage = TypingStartEvent | TypingStopEvent;
