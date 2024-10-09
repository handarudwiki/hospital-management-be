-- CreateTable
CREATE TABLE "bed_allodments" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "bed_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bed_allodments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bed_allodments" ADD CONSTRAINT "bed_allodments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bed_allodments" ADD CONSTRAINT "bed_allodments_bed_id_fkey" FOREIGN KEY ("bed_id") REFERENCES "beds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
