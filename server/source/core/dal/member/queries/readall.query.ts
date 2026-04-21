import type { MemberFindManyArgs } from "@prisma/models";
import type { MemberGetPayload } from "@prisma/models";
import { MemberStatus } from "@prisma/enums";

export namespace ReadAll {
  export interface Args {
    roomId: number;
  };

  export function query(args: Args) {
    return {
      where: {
        roomId: args.roomId,
        status: MemberStatus.ACTIVE,
      },
      include: {
        user: true,
      },
    } satisfies MemberFindManyArgs;
  };

  export type Result = MemberGetPayload<ReturnType<typeof query>>;
};
