/*
  Warnings:

  - You are about to drop the column `bodyTemp` on the `BodyTemp` table. All the data in the column will be lost.
  - You are about to drop the column `faliingData` on the `Falling` table. All the data in the column will be lost.
  - You are about to drop the column `HeartData` on the `Heart` table. All the data in the column will be lost.
  - You are about to drop the column `HumidityData` on the `Humidity` table. All the data in the column will be lost.
  - You are about to drop the column `oxygenData` on the `Oxygen` table. All the data in the column will be lost.
  - You are about to drop the column `roomTemp` on the `RoomTemp` table. All the data in the column will be lost.
  - Added the required column `data` to the `BodyTemp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Falling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Heart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Humidity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Oxygen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `RoomTemp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BodyTemp" DROP COLUMN "bodyTemp",
ADD COLUMN     "data" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Falling" DROP COLUMN "faliingData",
ADD COLUMN     "data" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Heart" DROP COLUMN "HeartData",
ADD COLUMN     "data" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Humidity" DROP COLUMN "HumidityData",
ADD COLUMN     "data" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Oxygen" DROP COLUMN "oxygenData",
ADD COLUMN     "data" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RoomTemp" DROP COLUMN "roomTemp",
ADD COLUMN     "data" TEXT NOT NULL;
