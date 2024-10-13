import {
  IsEmail,
  IsIn,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsOptional()
  @IsInt()
  patient_id: number;

  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  department_id: number;

  @IsNotEmpty()
  @IsInt()
  doctor_id: number;

  @IsOptional()
  @IsInt()
  payment_item_id: number;

  @IsNotEmpty()
  @IsISO8601()
  date: Date;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsIn(['confirmed', 'pending', 'cancelled'])
  status: string;

  @IsOptional()
  @IsString()
  notes: string;

  @IsOptional()
  @IsString()
  commission: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
