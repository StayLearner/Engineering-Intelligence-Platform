/*
  Warnings:

  - A unique constraint covering the columns `[gitId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "gitAvatarUrl" TEXT,
ADD COLUMN     "gitId" TEXT,
ADD COLUMN     "gitName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_gitId_key" ON "Users"("gitId");
