import type { InvitationFindFirstArgs } from "@prisma/models";
import { InvitationStatus } from "@prisma/enums";

export namespace Obtain {
  export interface Args {
    id?: number;
    roomId?: number;
    inviteeId?: number;
    status?: InvitationStatus;
  };

  export function query(args: Args) {
    return {
      where: {
        id: args.id,
        status: args.status,
        roomId: args.roomId,
        inviteeId: args.inviteeId,
      },
    } satisfies InvitationFindFirstArgs;
  };
};
