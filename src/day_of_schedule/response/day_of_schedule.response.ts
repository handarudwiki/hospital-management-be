import {
  DoctorResponse,
  toDoctorResponse,
} from 'src/doctor/response/doctor.response';

export class DayOfScheduleResponse {
  id: number;
  doctor: DoctorResponse;
  date: Date;
}

export function toDayOfScheduleResponse(data: any): DayOfScheduleResponse {
  const { id, date } = data;
  const dayOfScheduleResponse: DayOfScheduleResponse = {
    id,
    doctor: toDoctorResponse(data.doctor),
    date,
  };
  return dayOfScheduleResponse;
}
