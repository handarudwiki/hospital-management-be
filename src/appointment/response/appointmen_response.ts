import {
  DepartmentResponse,
  toDepartmentResponse,
} from './../../department/response/department.response';
import {
  DoctorResponse,
  toDoctorResponse,
} from 'src/doctor/response/doctor.response';
import { toUserResponse, UserResponse } from 'src/user/response/user.response';

export class AppointmentResponse {
  id: number;
  patient: UserResponse;
  doctor: DoctorResponse;
  department: DepartmentResponse;
  date: Date;
  time: string;
  status: string;
  notes: string;
}

export function toAppointmentResponse(data: any): AppointmentResponse {
  return {
    id: data.id,
    patient: toUserResponse(data.patient),
    doctor: toDoctorResponse(data.doctor),
    department: toDepartmentResponse(data.department),
    date: data.date,
    time: data.time,
    status: data.status,
    notes: data.notes,
  };
}
