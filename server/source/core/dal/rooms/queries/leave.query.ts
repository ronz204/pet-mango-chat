import type { MemberDeleteArgs } from "@prisma/models";

export namespace Leave {
  export interface Args {
    roomId: number;
    userId: number;
  };

  export function query(args: Args) {
    return {
      where: {
        userId_roomId: {
          roomId: args.roomId,
          userId: args.userId,
        },
      },
    } satisfies MemberDeleteArgs;
  };
};
