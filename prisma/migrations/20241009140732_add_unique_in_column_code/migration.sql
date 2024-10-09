/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `beds` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "beds_code_key" ON "beds"("code");
