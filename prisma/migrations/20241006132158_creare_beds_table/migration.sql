-- CreateTable
CREATE TABLE "bed" (
    "id" SERIAL NOT NULL,
    "department_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bed" ADD CONSTRAINT "bed_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
