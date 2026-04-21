-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "mango";

-- CreateEnum
CREATE TYPE "mango"."InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "mango"."MemberRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "mango"."MemberStatus" AS ENUM ('ACTIVE', 'LEAVED');

-- CreateTable
CREATE TABLE "mango"."invitations" (
    "id" SERIAL NOT NULL,
    "status" "mango"."InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "inviteeId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mango"."members" (
    "id" SERIAL NOT NULL,
    "role" "mango"."MemberRole" NOT NULL DEFAULT 'USER',
    "status" "mango"."MemberStatus" NOT NULL DEFAULT 'ACTIVE',
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mango"."messages" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mango"."rooms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mango"."users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_userId_roomId_key" ON "mango"."members"("userId", "roomId");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_name_key" ON "mango"."rooms"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "mango"."users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "mango"."users"("email");

-- AddForeignKey
ALTER TABLE "mango"."invitations" ADD CONSTRAINT "invitations_inviteeId_fkey" FOREIGN KEY ("inviteeId") REFERENCES "mango"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mango"."invitations" ADD CONSTRAINT "invitations_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "mango"."rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mango"."members" ADD CONSTRAINT "members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "mango"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mango"."members" ADD CONSTRAINT "members_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "mango"."rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mango"."messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "mango"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mango"."messages" ADD CONSTRAINT "messages_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "mango"."rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;