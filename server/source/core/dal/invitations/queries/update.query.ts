import type { InvitationUpdateArgs } from "@prisma/models";
import { InvitationStatus } from "@prisma/enums";

export namespace Update {
  export interface Args {
    invitationId: number;
    status: InvitationStatus;
  };

  export function query(args: Args) {
    return {
      where: {
        id: args.invitationId,
      },
      data: {
        status: args.status,
      },
    } satisfies InvitationUpdateArgs;
  };
};
