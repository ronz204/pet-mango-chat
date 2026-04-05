import type { RoomFindManyArgs } from "@prisma/models";

export namespace Own {
  export interface Args {
    userId: number;
  };

  export function query(args: Args) {
    return {
      where: {
        members: {
          some: { userId: args.userId }
        },
      },
    } satisfies RoomFindManyArgs;
  };
};
