/*
  Warnings:

  - You are about to drop the column `user_id` on the `dayoff_schedules` table. All the data in the column will be lost.
  - Added the required column `doctor_id` to the `dayoff_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "dayoff_schedules" DROP CONSTRAINT "dayoff_schedules_user_id_fkey";

-- AlterTable
ALTER TABLE "dayoff_schedules" DROP COLUMN "user_id",
ADD COLUMN     "doctor_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "dayoff_schedules" ADD CONSTRAINT "dayoff_schedules_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
