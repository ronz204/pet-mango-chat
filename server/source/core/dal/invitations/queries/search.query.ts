import type { InvitationFindManyArgs } from "@prisma/models";
import type { InvitationGetPayload } from "@prisma/models";
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
      include: {
        room: true,
      },
    } satisfies InvitationFindManyArgs;
  };

  export type Result = InvitationGetPayload<ReturnType<typeof query>>;
};
