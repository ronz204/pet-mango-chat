import type { RoomFindFirstArgs } from "@prisma/models";

export namespace Obtain {
  export interface Args {
    id?: number;
    name?: string;
  };

  export function query(args: Args) {
    return {
      where: {
        id: args.id,
        name: args.name,
      },
    } satisfies RoomFindFirstArgs;
  };
};
