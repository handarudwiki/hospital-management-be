import {
  DepartmentResponse,
  toDepartmentResponse,
} from 'src/department/response/department.response';

export class BedResponse {
  code: string;
  status: string;
  notes: string;
  department: DepartmentResponse;
}

export function toBedResponse(data: any): BedResponse {
  return {
    code: data.code,
    status: data.status,
    notes: data.notes,
    department: toDepartmentResponse(data.department),
  };
}
