import { IsInt, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateLapReportDto {
  @IsNotEmpty()
  @IsInt()
  template_id: number;

  @IsNotEmpty()
  @IsISO8601()
  date: Date;

  @IsNotEmpty()
  @IsInt()
  patient_id: number;

  @IsNotEmpty()
  @IsInt()
  doctor_id: number;

  @IsNotEmpty()
  @IsString()
  report: string;

  @IsNotEmpty()
  @IsString()
  time: string;
}
