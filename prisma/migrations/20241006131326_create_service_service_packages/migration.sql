-- CreateTable
CREATE TABLE "service_service_packages" (
    "id" SERIAL NOT NULL,
    "service_id" INTEGER NOT NULL,
    "service_package_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_service_packages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "service_service_packages" ADD CONSTRAINT "service_service_packages_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_service_packages" ADD CONSTRAINT "service_service_packages_service_package_id_fkey" FOREIGN KEY ("service_package_id") REFERENCES "service_packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
