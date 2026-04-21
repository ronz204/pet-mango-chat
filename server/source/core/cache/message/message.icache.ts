import type { MessageDto } from "@dal/message/message.dto";

export interface IMessageCache {
  getter(args: GetterArgs): Promise<MessageDto[]>;
  dropper(args: DropperArgs): Promise<void>;
  setter(args: SetterArgs): Promise<void>;
  pusher(args: PusherArgs): Promise<void>;
};

export interface GetterArgs {
  roomId: number;
  limit: number;
  offset: number;
};

export interface SetterArgs {
  roomId: number;
  messages: MessageDto[];
};

export interface PusherArgs {
  roomId: number;
  message: MessageDto;
};

export interface DropperArgs {
  roomId: number;
};
