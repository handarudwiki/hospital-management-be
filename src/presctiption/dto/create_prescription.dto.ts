import { Type } from 'class-transformer';
import {
  IsInt,
  IsString,
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

export class CreatePrescriptionDto {
  @IsNotEmpty()
  @IsInt()
  patient_id: number;

  @IsNotEmpty()
  @IsInt()
  doctor_id: number;

  @IsNotEmpty()
  @IsString()
  blood_pressure: string;

  @IsNotEmpty()
  @IsString()
  diabetes: string;

  @IsNotEmpty()
  @IsString()
  symptoms: string;

  @IsNotEmpty()
  @IsString()
  advice: string;

  @IsNotEmpty()
  @IsString()
  diagnosis: string;

  @IsNotEmpty()
  @IsISO8601()
  date: Date;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Medicine)
  medicines: Medicine[];
}
