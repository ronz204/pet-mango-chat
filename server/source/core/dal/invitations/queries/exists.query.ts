import type { InvitationCountArgs } from "@prisma/models";
import { InvitationStatus } from "@prisma/enums";

export namespace Exists {
  export interface Args {
    roomId: number;
    inviteeId: number;
  };

  export function query(args: Args) {
    return {
      where: {
        roomId: args.roomId,
        inviteeId: args.inviteeId,
        status: InvitationStatus.PENDING
      },
    } satisfies InvitationCountArgs;
  };
};
