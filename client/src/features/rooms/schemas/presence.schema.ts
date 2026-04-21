export interface OnlineListEvent {
  event: "online:list";
  userIds: number[];
}

export interface UserOnlineEvent {
  event: "user:online";
  userId: number;
}

export interface UserOfflineEvent {
  event: "user:offline";
  userId: number;
}

export type PresenceEvent = OnlineListEvent | UserOnlineEvent | UserOfflineEvent;
