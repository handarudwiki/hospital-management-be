import { DepartmentResponse } from 'src/department/response/department.response';

export class DoctorResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  phone: string;
  address: string;
  specialist: string;
  education_qualification: string;
  medical_degree: string;
  mobile: string;
  emergency: string;
  biography: string;
  blood_group: string;
  gender: string;
  picture: string;
  departments?: DepartmentResponse[];
}

export function toDoctorResponse(data: any): DoctorResponse {
  return {
    id: data.id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    birth_date: data.birth_date,
    phone: data.phone,
    address: data.address,
    specialist: data.specialist,
    education_qualification: data.educational_qualification,
    medical_degree: data.medical_degree,
    mobile: data.mobile,
    emergency: data.emergency,
    biography: data.biography,
    blood_group: data.blood_group,
    gender: data.gender,
    picture: data.picture,
    departments: data.departmentUsers,
  };
}
