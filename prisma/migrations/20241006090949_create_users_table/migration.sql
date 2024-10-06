-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "national_id" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "address" TEXT,
    "picture" TEXT,
    "birth_date" TEXT NOT NULL,
    "gender" "Gender",
    "phone" TEXT,
    "mobile" TEXT,
    "emergency" TEXT,
    "type" TEXT,
    "email_verified_at" TEXT,
    "medical_degree" TEXT,
    "specialist" TEXT,
    "biography" TEXT,
    "educational_qualification" TEXT,
    "blood_group" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
