-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "accountType" TEXT NOT NULL DEFAULT 'PATIENT';

-- AlterTable
ALTER TABLE "responsible" ADD COLUMN     "accountType" TEXT NOT NULL DEFAULT 'RESPONSIBLE';

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "accountType" TEXT NOT NULL DEFAULT 'ADMIN',
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");
