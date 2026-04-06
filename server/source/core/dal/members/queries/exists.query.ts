import type { RoomFindFirstArgs } from "@prisma/models";
import type { RoomGetPayload } from "@prisma/models";
import { MemberStatus } from "@prisma/enums";

export namespace Exists {
  export interface Args {
    roomId: number;
    userId: number;
  };

  export function query(args: Args) {
    return {
      where: { id: args.roomId },
      
      include: {
        members: { where: {
          userId: args.userId, status: MemberStatus.ACTIVE
        }},
      },
    } satisfies RoomFindFirstArgs;
  };

  export type Result = RoomGetPayload<ReturnType<typeof query>>;
};
