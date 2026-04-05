-- CreateEnum
CREATE TYPE "mango"."InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED');

-- CreateTable
CREATE TABLE "mango"."invitations" (
    "id" SERIAL NOT NULL,
    "status" "mango"."InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "inviteeId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mango"."invitations" ADD CONSTRAINT "invitations_inviteeId_fkey" FOREIGN KEY ("inviteeId") REFERENCES "mango"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mango"."invitations" ADD CONSTRAINT "invitations_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "mango"."rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
