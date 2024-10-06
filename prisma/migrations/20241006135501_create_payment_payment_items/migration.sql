/*
  Warnings:

  - You are about to drop the `PaymentItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PaymentItem" DROP CONSTRAINT "PaymentItem_doctor_id_fkey";

-- DropTable
DROP TABLE "PaymentItem";

-- CreateTable
CREATE TABLE "payment_items" (
    "id" SERIAL NOT NULL,
    "doctor_id" INTEGER,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "commission" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_payment_items" (
    "id" SERIAL NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "payment_item_id" INTEGER NOT NULL,
    "payment_item_quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_payment_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment_items" ADD CONSTRAINT "payment_items_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_payment_items" ADD CONSTRAINT "payment_payment_items_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_payment_items" ADD CONSTRAINT "payment_payment_items_payment_item_id_fkey" FOREIGN KEY ("payment_item_id") REFERENCES "payment_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
