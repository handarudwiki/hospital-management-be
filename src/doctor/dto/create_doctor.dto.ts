import {
  IsEmail,
  IsIn,
  IsISO8601,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsISO8601()
  birth_date: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsString()
  specialist: string;
  @IsNotEmpty()
  @IsString()
  education_qualification: string;
  @IsNotEmpty()
  @IsString()
  medical_degree: string;
  @IsNotEmpty()
  @IsString()
  mobile: string;
  @IsNotEmpty()
  @IsString()
  emergency: string;
  @IsNotEmpty()
  @IsString()
  biography: string;
  @IsNotEmpty()
  @IsString()
  blood_group: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['male', 'female'])
  gender: string;
}
