import type { RoomFindUniqueArgs } from "@prisma/models";

export namespace Details {
  export interface Args {
    roomId: number;
  };

  export function query(args: Args) {
    return {
      where: {
        id: args.roomId,
      },
    } satisfies RoomFindUniqueArgs;
  };
};
