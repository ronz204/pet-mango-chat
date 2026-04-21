import type { MessageCreateArgs } from "@prisma/models";
import type { MessageGetPayload } from "@prisma/models";

export namespace Create {
  export interface Args {
    roomId: number;
    content: string;
    senderId: number;
  };

  export function query(args: Args) {
    return {
      data: {
        roomId: args.roomId,
        content: args.content,
        senderId: args.senderId,
      },
      include: {
        sender: true,
      },
    } satisfies MessageCreateArgs;
  };

  export type Result = MessageGetPayload<ReturnType<typeof query>>;
};