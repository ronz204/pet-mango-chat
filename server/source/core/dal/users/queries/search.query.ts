import type { UserFindManyArgs } from "@prisma/models";

export namespace Search {
  export interface Args {
    userId: number;
    name?: string;
  };

  export function query(args: Args) {
    return {
      where: {
        name: args.name,
        id: { not: args.userId },
      },
    } satisfies UserFindManyArgs;
  };
};
