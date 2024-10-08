import { User } from '@prisma/client';

export class UserResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  birth_date?: string;
  address?: string;
  phone?: string;
  gender?: string;
  mobile?: string;
  emergency?: string;
  type?: string;
  medical_degree?: string;
  specialist?: string;
  biography?: string;
  educational_qualification?: string;
  blood_group?: string;
  created_at: Date;
  updated_at: Date;
}

export function toUserResponse(data: User): UserResponse {
  return {
    id: data.id,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    birth_date: data.birth_date,
    address: data.address,
    phone: data.phone,
    mobile: data.mobile,
    gender: data.gender,
    emergency: data.emergency,
    type: data.role,
    medical_degree: data.medical_degree,
    specialist: data.specialist,
    biography: data.biography,
    educational_qualification: data.educational_qualification,
    blood_group: data.blood_group,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}
