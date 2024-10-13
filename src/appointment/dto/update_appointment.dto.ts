import { IsIn, IsInt, IsISO8601, IsOptional, IsString } from 'class-validator';

export class UpdaeteAppointmentDto {
  @IsOptional()
  @IsInt()
  patient_id: number;

  @IsOptional()
  @IsInt()
  doctor_id: number;

  @IsOptional()
  @IsInt()
  department_id: number;

  @IsOptional()
  @IsISO8601()
  date: Date;

  @IsOptional()
  @IsString()
  time: string;

  @IsOptional()
  @IsIn(['confirmed', 'pending', 'cancelled'])
  status: string;

  @IsOptional()
  @IsString()
  notes: string;
}
