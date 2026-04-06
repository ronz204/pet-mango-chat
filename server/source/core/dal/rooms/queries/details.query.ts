import type { RoomFindUniqueArgs } from "@prisma/models";
import type { RoomGetPayload } from "@prisma/models";

export namespace Details {
  export interface Args {
    roomId: number;
  };

  export function query(args: Args) {
    return {
      where: {
        id: args.roomId,
      },
      include: {
        members: { include: { user: true } },
      },
    } satisfies RoomFindUniqueArgs;
  };

  export type Result = RoomGetPayload<ReturnType<typeof query>>;
};
