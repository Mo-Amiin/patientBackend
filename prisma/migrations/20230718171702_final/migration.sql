/*
  Warnings:

  - The `patientId` column on the `responsible` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[patientProfileID]` on the table `responsible` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `patientProfileID` to the `responsible` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "responsible" DROP CONSTRAINT "responsible_patientId_fkey";

-- AlterTable
ALTER TABLE "responsible" ADD COLUMN     "patientProfileID" TEXT NOT NULL,
DROP COLUMN "patientId",
ADD COLUMN     "patientId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "responsible_patientProfileID_key" ON "responsible"("patientProfileID");

-- AddForeignKey
ALTER TABLE "responsible" ADD CONSTRAINT "responsible_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
