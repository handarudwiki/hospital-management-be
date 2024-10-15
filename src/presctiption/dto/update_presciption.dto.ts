import { Type } from 'class-transformer';
import {
  IsInt,
  IsString,
  IsOptional,
  IsISO8601,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';

class Medicine {
  @IsNotEmpty()
  @IsInt()
  medicine_id: number;

  @IsNotEmpty()
  @IsString()
  instruction: string;
}

export class UpdatePrescriptionDto {
  @IsOptional()
  @IsInt()
  patient_id: number;

  @IsOptional()
  @IsInt()
  doctor_id: number;

  @IsOptional()
  @IsString()
  blood_pressure: string;

  @IsOptional()
  @IsString()
  diabetes: string;

  @IsOptional()
  @IsString()
  symptoms: string;

  @IsOptional()
  @IsString()
  advice: string;

  @IsOptional()
  @IsString()
  diagnosis: string;

  @IsOptional()
  @IsISO8601()
  date: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Medicine)
  medicines: Medicine[];
}
