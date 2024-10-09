import { IsInt, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreaBedAllodMent {
  @IsNotEmpty()
  @IsInt()
  bed_id: number;

  @IsNotEmpty()
  @IsInt()
  patient_id: number;

  @IsNotEmpty()
  @IsISO8601()
  start_date: string;

  @IsNotEmpty()
  @IsISO8601()
  end_date: Date;

  @IsNotEmpty()
  @IsString()
  start_time: string;

  @IsNotEmpty()
  @IsString()
  end_time: string;
}
