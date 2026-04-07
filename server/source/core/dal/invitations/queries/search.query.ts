import type { InvitationFindManyArgs } from "@prisma/models";
import { InvitationStatus } from "@prisma/enums";

export namespace Search {
  export interface Args {
    roomId?: number;
    inviteeId?: number;
    status?: InvitationStatus;
  };

  export function query(args: Args) {
    return {
      where: {
        status: args.status,
        roomId: args.roomId,
        inviteeId: args.inviteeId,
      },
    } satisfies InvitationFindManyArgs;
  };
};
