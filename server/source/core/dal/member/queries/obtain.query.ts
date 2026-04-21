import type { MemberFindFirstArgs } from "@prisma/models";
import { MemberStatus } from "@prisma/enums";

export namespace Obtain {
  export interface Args {
    roomId?: number;
    userId?: number;
    status?: MemberStatus;
  };

  export function query(args: Args) {
    return {
      where: {
        userId: args.userId,
        roomId: args.roomId,
        status: args.status,
      },
    } satisfies MemberFindFirstArgs;
  };
};
