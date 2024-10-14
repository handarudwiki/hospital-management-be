/*
  Warnings:

  - Changed the type of `commission` on the `payment_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "payment_items" DROP COLUMN "commission",
ADD COLUMN     "commission" DOUBLE PRECISION NOT NULL;
