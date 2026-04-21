export interface ITypingCache {
  start(args: StartArgs): Promise<void>;
  stop(args: StopArgs): Promise<void>;
  getTyping(args: GetTypingArgs): Promise<number[]>;
};

export interface StartArgs {
  roomId: number;
  userId: number;
};

export interface StopArgs {
  roomId: number;
  userId: number;
};

export interface GetTypingArgs {
  roomId: number;
};