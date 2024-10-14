import {
  DoctorResponse,
  toDoctorResponse,
} from 'src/doctor/response/doctor.response';

export class PaymentItemResponse {
  id: number;
  doctor: DoctorResponse;
  code: string;
  name: string;
  type: string;
  price: number;
  commission: number;
  quantity: number;
}

export function toPaymentItemResponse(data: any): PaymentItemResponse {
  return {
    id: data.id,
    doctor: toDoctorResponse(data.doctor),
    code: data.code,
    name: data.name,
    type: data.type,
    price: data.price,
    commission: data.commission,
    quantity: data.quantity,
  };
}
