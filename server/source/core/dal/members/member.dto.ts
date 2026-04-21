import { t, type Static } from "elysia";
import { MemberRole } from "@prisma/enums";

export const MemberDto = t.Object({
  id: t.Number(),
  userId: t.Number(),
  userName: t.String(),
  userRole: t.Enum(MemberRole),
});

export type MemberDto = Static<typeof MemberDto>;
