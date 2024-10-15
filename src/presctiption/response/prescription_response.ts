import {
  DoctorResponse,
  toDoctorResponse,
} from 'src/doctor/response/doctor.response';
import {
  MedicineResponse,
  toMedicineResponse,
} from 'src/medicine/response/medicine.response';
import { toUserResponse, UserResponse } from 'src/user/response/user.response';

export class PrescriptionResponse {
  id: number;
  doctor: DoctorResponse;
  patient: UserResponse;
  blood_pressure?: string;
  diabetes?: string;
  symptoms: string;
  advice?: string;
  diagnosis: string;
  date: string;
  medicines: MedicineResponse[];
}

export function toPrescriptionResponse(data: any): PrescriptionResponse {
  return {
    id: data.id,
    doctor: toDoctorResponse(data.doctor),
    patient: toUserResponse(data.patient),
    blood_pressure: data.blood_pressure,
    diabetes: data.diabetes,
    symptoms: data.symptoms,
    advice: data.advice,
    diagnosis: data.diagnosis,
    date: data.date,
    medicines: data.medicinePrescriptions.map((i) =>
      toMedicineResponse(i.medicine),
    ),
  };
}
