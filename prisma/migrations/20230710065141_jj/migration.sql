-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_patientId_fkey";

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "patientId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("patientID") ON DELETE SET NULL ON UPDATE CASCADE;
