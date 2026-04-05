import type { RoomCreateArgs } from "@prisma/models";
import { MemberRole } from "@prisma/enums";

export namespace Create {
  export interface Args {
    name: string;
    ownerId: number;
  };

  export function query(args: Args) {
    return {
      data: {
        name: args.name,
        members: {
          create: {
            userId: args.ownerId,
            role: MemberRole.ADMIN,
          },
        },
      },
    } satisfies RoomCreateArgs;
  };
};
