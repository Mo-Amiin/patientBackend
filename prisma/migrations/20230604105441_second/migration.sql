/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "tell" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "responsible" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "tell" TEXT NOT NULL,
    "backup_tell" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "ResponsibleType" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "patient_id_key" ON "patient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "patient_name_key" ON "patient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "patient_tell_key" ON "patient"("tell");

-- CreateIndex
CREATE UNIQUE INDEX "responsible_id_key" ON "responsible"("id");

-- CreateIndex
CREATE UNIQUE INDEX "responsible_name_key" ON "responsible"("name");

-- CreateIndex
CREATE UNIQUE INDEX "responsible_tell_key" ON "responsible"("tell");

-- CreateIndex
CREATE UNIQUE INDEX "responsible_backup_tell_key" ON "responsible"("backup_tell");

-- CreateIndex
CREATE UNIQUE INDEX "responsible_email_key" ON "responsible"("email");

-- AddForeignKey
ALTER TABLE "responsible" ADD CONSTRAINT "responsible_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
