import {
  DepartmentResponse,
  toDepartmentResponse,
} from 'src/department/response/department.response';

export class ServiceResponse {
  id: number;
  name: string;
  charge: number;
  doctor_commission: number;
  department: DepartmentResponse;
}

export function toServiceResponse(data: any): ServiceResponse {
  return {
    id: data.id,
    name: data.name,
    charge: data.charge,
    doctor_commission: data.doctor_commission,
    department: toDepartmentResponse(data.department),
  };
}
