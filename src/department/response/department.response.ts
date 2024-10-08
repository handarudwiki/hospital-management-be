import { Department } from '@prisma/client';

export class DepartmentResponse {
  id: number;
  name: string;
  description: string;
}

export function toDepartmentResponse(data: Department): DepartmentResponse {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
  };
}
