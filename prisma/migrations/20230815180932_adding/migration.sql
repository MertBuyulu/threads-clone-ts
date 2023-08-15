/*
  Warnings:

  - You are about to drop the `_CommunityMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CommunityMembers" DROP CONSTRAINT "_CommunityMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommunityMembers" DROP CONSTRAINT "_CommunityMembers_B_fkey";

-- DropTable
DROP TABLE "_CommunityMembers";

-- CreateTable
CREATE TABLE "Membership" (
    "communityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("communityId","userId")
);

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
