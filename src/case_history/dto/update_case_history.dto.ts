import { IsInt, IsISO8601, IsOptional, IsString } from 'class-validator';

export class UpdateCaseHistoryDto {
  @IsOptional()
  @IsInt()
  patient_id: number;

  @IsOptional()
  @IsISO8601()
  date: Date;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  food_allergies: string;

  @IsOptional()
  @IsString()
  bleed_tendency: string;

  @IsOptional()
  @IsString()
  heart_disease: string;

  @IsOptional()
  @IsString()
  blood_pressure: string;

  @IsOptional()
  @IsString()
  diabetic: string;

  @IsOptional()
  @IsString()
  surgery: string;

  @IsOptional()
  @IsString()
  accident: string;

  @IsOptional()
  @IsString()
  family_medical_history: string;

  @IsOptional()
  @IsString()
  current_medication: string;

  @IsOptional()
  @IsString()
  female_prenancy: string;

  @IsOptional()
  @IsString()
  breast_feeding: string;

  @IsOptional()
  @IsString()
  health_insurance: string;

  @IsOptional()
  @IsString()
  low_income: string;

  @IsOptional()
  @IsString()
  reference: string;

  @IsOptional()
  @IsString()
  others: string;

  @IsOptional()
  @IsString()
  status: string;
}
