-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER,
    "date" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "BodyTemp" (
    "name" TEXT NOT NULL DEFAULT 'temp',
    "bodyTemp" DOUBLE PRECISION NOT NULL,
    "reportID" INTEGER
);

-- CreateTable
CREATE TABLE "RoomTemp" (
    "name" TEXT NOT NULL DEFAULT 'roomtemp',
    "roomTemp" DOUBLE PRECISION NOT NULL,
    "reportID" INTEGER
);

-- CreateTable
CREATE TABLE "Heart" (
    "name" TEXT NOT NULL DEFAULT 'heart',
    "HeartData" DOUBLE PRECISION NOT NULL,
    "reportID" INTEGER
);

-- CreateTable
CREATE TABLE "Oxygen" (
    "name" TEXT NOT NULL DEFAULT 'oxygen',
    "oxygenData" DOUBLE PRECISION NOT NULL,
    "reportID" INTEGER
);

-- CreateTable
CREATE TABLE "Falling" (
    "name" TEXT NOT NULL DEFAULT 'falling',
    "faliingData" DOUBLE PRECISION NOT NULL,
    "reportID" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_id_key" ON "Report"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BodyTemp_name_key" ON "BodyTemp"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RoomTemp_name_key" ON "RoomTemp"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Heart_name_key" ON "Heart"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Oxygen_name_key" ON "Oxygen"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Falling_name_key" ON "Falling"("name");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyTemp" ADD CONSTRAINT "BodyTemp_reportID_fkey" FOREIGN KEY ("reportID") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTemp" ADD CONSTRAINT "RoomTemp_reportID_fkey" FOREIGN KEY ("reportID") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heart" ADD CONSTRAINT "Heart_reportID_fkey" FOREIGN KEY ("reportID") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oxygen" ADD CONSTRAINT "Oxygen_reportID_fkey" FOREIGN KEY ("reportID") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Falling" ADD CONSTRAINT "Falling_reportID_fkey" FOREIGN KEY ("reportID") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;
