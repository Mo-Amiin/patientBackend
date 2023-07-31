/*
  Warnings:

  - You are about to drop the column `Date` on the `BodyTemp` table. All the data in the column will be lost.
  - You are about to drop the column `Date` on the `Heart` table. All the data in the column will be lost.
  - You are about to drop the column `Date` on the `RoomTemp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BodyTemp" DROP COLUMN "Date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Falling" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Heart" DROP COLUMN "Date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Humidity" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Oxygen" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "RoomTemp" DROP COLUMN "Date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
