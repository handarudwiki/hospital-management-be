import {
  DoctorResponse,
  toDoctorResponse,
} from 'src/doctor/response/doctor.response';
import {
  LapTemplateResponse,
  toLabTemplateResponse,
} from 'src/lap_template/response/lap_template.response';
import { toUserResponse, UserResponse } from 'src/user/response/user.response';

export class LapReportResponse {
  id: number;
  template: LapTemplateResponse;
  date: Date;
  patient: UserResponse;
  doctor: DoctorResponse;
  report: string;
  time: string;
}

export function toLabReportResponse(response: any): LapReportResponse {
  return {
    id: response.id,
    template: toLabTemplateResponse(response.template),
    date: response.date,
    patient: toUserResponse(response.patient),
    doctor: toDoctorResponse(response.doctor),
    report: response.report,
    time: response.time,
  };
}
