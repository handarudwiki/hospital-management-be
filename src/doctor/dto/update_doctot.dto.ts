import {
  IsEmail,
  IsISO8601,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateDoctorDto {
  @IsOptional()
  @IsString()
  first_name: string;
  @IsOptional()
  @IsString()
  last_name: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsISO8601()
  birth_date: string;
  @IsOptional()
  @IsString()
  password: string;
  @IsOptional()
  @IsPhoneNumber()
  phone: string;
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  specialist: string;
  @IsOptional()
  @IsString()
  education_qualification: string;
  @IsOptional()
  @IsString()
  medical_degree: string;
  @IsOptional()
  @IsString()
  mobile: string;
  @IsOptional()
  @IsString()
  emergency: string;
  @IsOptional()
  @IsString()
  biography: string;
  @IsOptional()
  @IsString()
  blood_group: string;
  @IsOptional()
  @IsString()
  gender: string;
}
