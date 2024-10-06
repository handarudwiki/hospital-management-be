-- CreateTable
CREATE TABLE "lap_reports" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "report" TEXT NOT NULL,
    "template_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lap_reports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lap_reports" ADD CONSTRAINT "lap_reports_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lap_reports" ADD CONSTRAINT "lap_reports_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lap_reports" ADD CONSTRAINT "lap_reports_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "lap_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
