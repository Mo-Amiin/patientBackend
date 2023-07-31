/*
  Warnings:

  - You are about to drop the column `UserName` on the `responsible` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "responsible_UserName_key";

-- AlterTable
ALTER TABLE "responsible" DROP COLUMN "UserName";
