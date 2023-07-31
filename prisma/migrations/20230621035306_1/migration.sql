/*
  Warnings:

  - You are about to drop the column `password` on the `responsible` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UserName]` on the table `responsible` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UserName` to the `responsible` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "responsible" DROP COLUMN "password",
ADD COLUMN     "UserName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "responsible_UserName_key" ON "responsible"("UserName");
