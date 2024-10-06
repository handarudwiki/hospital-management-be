-- CreateTable
CREATE TABLE "time_schedules" (
    "id" SERIAL NOT NULL,
    "week_day" TEXT NOT NULL,
    "week_num" INTEGER,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "duration" TEXT,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time_schedules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "time_schedules" ADD CONSTRAINT "time_schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
