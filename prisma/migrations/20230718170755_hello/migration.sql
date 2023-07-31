-- DropForeignKey
ALTER TABLE "responsible" DROP CONSTRAINT "responsible_patientId_fkey";

-- AlterTable
ALTER TABLE "responsible" ALTER COLUMN "patientId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "responsible" ADD CONSTRAINT "responsible_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("patientID") ON DELETE SET NULL ON UPDATE CASCADE;
