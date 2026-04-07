import type { UserFindManyArgs } from "@prisma/models";

export namespace Invitees {
  export interface Args {
    roomId: number;
  };

  export function query(args: Args) {
    return {
      where: {
        members: { none: { roomId: args.roomId } },
      },
    } satisfies UserFindManyArgs;
  };
};
