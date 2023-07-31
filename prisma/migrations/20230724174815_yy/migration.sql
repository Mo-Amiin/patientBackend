-- CreateTable
CREATE TABLE "Humidity" (
    "id" SERIAL NOT NULL,
    "HumidityData" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT '',
    "reportID" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Humidity_id_key" ON "Humidity"("id");

-- AddForeignKey
ALTER TABLE "Humidity" ADD CONSTRAINT "Humidity_reportID_fkey" FOREIGN KEY ("reportID") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;
