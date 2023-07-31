/*
  Warnings:

  - A unique constraint covering the columns `[patientId]` on the table `patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `patientId` to the `patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "patientId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "patient_patientId_key" ON "patient"("patientId");
