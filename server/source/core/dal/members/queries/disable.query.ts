import type { MemberUpdateArgs } from "@prisma/models";
import { MemberStatus } from "@prisma/enums";

export namespace Disable {
  export interface Args {
    userId: number;
    roomId: number;
  };

  export function query(args: Args) {
    return {
      where: {
        userId_roomId: {
          userId: args.userId,
          roomId: args.roomId,
        },
      },
      data: {
        status: MemberStatus.LEAVED,
      },
    } satisfies MemberUpdateArgs;
  };
};
