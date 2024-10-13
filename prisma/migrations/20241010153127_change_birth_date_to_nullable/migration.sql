/*
  Warnings:

  - You are about to drop the `Finance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Finance";

-- CreateTable
CREATE TABLE "finances" (
    "id" SERIAL NOT NULL,
    "total_monet" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "finances_pkey" PRIMARY KEY ("id")
);
