import {
  DoctorResponse,
  toDoctorResponse,
} from 'src/doctor/response/doctor.response';
import { toUserResponse, UserResponse } from 'src/user/response/user.response';

export class DocumentResponse {
  id: number;
  patient: UserResponse;
  doctor: DoctorResponse;
  desciption: string;
  date?: string;
  doc?: string;
  status?: string;
}

export function toDocumentResponse(data: any): DocumentResponse {
  return {
    id: data.id,
    patient: toUserResponse(data.patient),
    doctor: toDoctorResponse(data.doctor),
    date: data.date,
    desciption: data.description,
    doc: data.doc,
    status: data.status,
  };
}
