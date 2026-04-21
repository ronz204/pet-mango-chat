export interface IPresenceCache {
  add(args: AddArgs): Promise<void>;
  remove(args: RemoveArgs): Promise<void>;
  getOnline(args: GetOnlineArgs): Promise<number[]>;
};

export interface AddArgs {
  roomId: number;
  userId: number;
};

export interface RemoveArgs {
  roomId: number;
  userId: number;
};

export interface GetOnlineArgs {
  roomId: number;
};