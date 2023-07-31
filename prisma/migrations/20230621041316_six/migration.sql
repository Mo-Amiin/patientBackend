/*
  Warnings:

  - You are about to drop the column `patientId` on the `patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[patientID]` on the table `patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `patientID` to the `patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "patient_patientId_key";

-- AlterTable
ALTER TABLE "patient" DROP COLUMN "patientId",
ADD COLUMN     "patientID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "patient_patientID_key" ON "patient"("patientID");
