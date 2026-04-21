import type { MemberCreateArgs } from "@prisma/models";
import { MemberRole } from "@prisma/enums";

export namespace Create {
  export interface Args {
    userId: number;
    roomId: number;
    role: MemberRole;
  };

  export function query(args: Args) {
    return {
      data: {
        userId: args.userId,
        roomId: args.roomId,
        role: args.role,
      },
    } satisfies MemberCreateArgs;
  };
};
