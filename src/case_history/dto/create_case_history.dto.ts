import {
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCaseHistoryDto {
  @IsNotEmpty()
  @IsInt()
  patient_id: number;

  @IsNotEmpty()
  @IsISO8601()
  date: Date;

  @IsNotEmpty()
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
