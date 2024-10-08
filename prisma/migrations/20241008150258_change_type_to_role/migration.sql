/*
  Warnings:

  - You are about to drop the column `type` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'doctor', 'patient', 'nurse', 'receptionist');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "type",
ADD COLUMN     "role" "Role" DEFAULT 'patient';
