import { MedicineCatgory } from '@prisma/client';

export class MedicineResponse {
  id: number;
  name: string;
  instruction?: string;
  purchase_price: number;
  sale_price: number;
  expire_date: Date;
  company: string;
  quantity: number;
  medicine_category: MedicineCatgory;
}

export function toMedicineResponse(medicine: any): MedicineResponse {
  return {
    id: medicine.id,
    name: medicine.name,
    instruction: medicine.instruction,
    purchase_price: medicine.purchase_price,
    sale_price: medicine.sale_price,
    expire_date: medicine.expire_date,
    company: medicine.company,
    quantity: medicine.quantity,
    medicine_category: medicine.Category,
  };
}
