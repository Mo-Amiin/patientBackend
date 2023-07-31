/*
  Warnings:

  - You are about to drop the column `name` on the `BodyTemp` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Falling` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Heart` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Oxygen` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `RoomTemp` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `BodyTemp` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Falling` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Heart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Oxygen` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `RoomTemp` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BodyTemp_name_key";

-- DropIndex
DROP INDEX "Falling_name_key";

-- DropIndex
DROP INDEX "Heart_name_key";

-- DropIndex
DROP INDEX "Oxygen_name_key";

-- DropIndex
DROP INDEX "RoomTemp_name_key";

-- AlterTable
ALTER TABLE "BodyTemp" DROP COLUMN "name",
ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Falling" DROP COLUMN "name",
ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Heart" DROP COLUMN "name",
ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Oxygen" DROP COLUMN "name",
ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "RoomTemp" DROP COLUMN "name",
ADD COLUMN     "id" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BodyTemp_id_key" ON "BodyTemp"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Falling_id_key" ON "Falling"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Heart_id_key" ON "Heart"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Oxygen_id_key" ON "Oxygen"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RoomTemp_id_key" ON "RoomTemp"("id");
