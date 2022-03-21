/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Radio" ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nickname" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
