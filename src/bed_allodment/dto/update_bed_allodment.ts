import { IsInt, IsISO8601, IsOptional, IsString } from 'class-validator';

export class UpdateBedAllodMent {
  @IsOptional()
  @IsInt()
  bed_id: number;

  @IsOptional()
  @IsInt()
  patient_id: number;

  @IsOptional()
  @IsISO8601()
  start_date: string;

  @IsOptional()
  @IsISO8601()
  end_date: Date;

  @IsOptional()
  @IsString()
  start_time: string;

  @IsOptional()
  @IsString()
  end_time: string;
}
