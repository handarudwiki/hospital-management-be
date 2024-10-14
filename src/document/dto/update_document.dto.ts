import { IsInt, IsISO8601, IsOptional, IsString } from 'class-validator';

export class UpdateDocumentDto {
  @IsOptional()
  @IsInt()
  patient_id: number;

  @IsOptional()
  @IsInt()
  doctor_id: number;

  @IsOptional()
  @IsISO8601()
  date: Date;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  doc: string;

  @IsOptional()
  @IsString()
  status: string;
}
