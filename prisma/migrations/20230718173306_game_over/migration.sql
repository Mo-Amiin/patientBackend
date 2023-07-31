/*
  Warnings:

  - You are about to drop the column `id` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `patientProfileID` on the `responsible` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "responsible" DROP CONSTRAINT "responsible_patientId_fkey";

-- DropIndex
DROP INDEX "patient_id_key";

-- DropIndex
DROP INDEX "responsible_patientProfileID_key";

-- AlterTable
ALTER TABLE "patient" DROP COLUMN "id";

-- AlterTable
ALTER TABLE "responsible" DROP COLUMN "patientProfileID",
ALTER COLUMN "patientId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "responsible" ADD CONSTRAINT "responsible_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("patientID") ON DELETE SET NULL ON UPDATE CASCADE;
