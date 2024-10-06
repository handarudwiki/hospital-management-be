-- CreateTable
CREATE TABLE "case_histories" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "food_allergies" TEXT,
    "bleed_tendency" TEXT,
    "heart_disease" TEXT,
    "blood_preasure" TEXT,
    "diabetic" TEXT,
    "surgery" TEXT,
    "accident" TEXT,
    "family_medical_history" TEXT,
    "current_medication" TEXT,
    "female_pregnancy" TEXT,
    "breast_feeding" TEXT,
    "health_insurance" TEXT,
    "low_income" TEXT,
    "reference" TEXT,
    "others" TEXT,
    "status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "case_histories" ADD CONSTRAINT "case_histories_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
