/*
  Warnings:

  - A unique constraint covering the columns `[inviteCode]` on the table `Server` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Server` MODIFY `inviteCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Server_inviteCode_key` ON `Server`(`inviteCode`);
