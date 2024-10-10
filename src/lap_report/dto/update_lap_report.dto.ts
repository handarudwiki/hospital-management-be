import { IsInt, IsISO8601, IsOptional, IsString } from 'class-validator';

export class UdpateLapReportDto {
  @IsOptional()
  @IsInt()
  template_id: number;

  @IsOptional()
  @IsISO8601()
  date: Date;

  @IsOptional()
  @IsInt()
  patient_id: number;

  @IsOptional()
  @IsInt()
  doctor_id: number;

  @IsOptional()
  @IsString()
  report: string;

  @IsOptional()
  @IsString()
  time: string;
}
