import type { InvitationCreateArgs } from "@prisma/models";

export namespace Create {
  export interface Args {
    roomId: number;
    inviteeId: number;
  };

  export function query(args: Args) {
    return {
      data: {
        roomId: args.roomId,
        inviteeId: args.inviteeId,
      },
    } satisfies InvitationCreateArgs;
  };
};
