/*
  Warnings:

  - Changed the type of `faliingData` on the `Falling` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Falling" DROP COLUMN "faliingData",
ADD COLUMN     "faliingData" INTEGER NOT NULL;
