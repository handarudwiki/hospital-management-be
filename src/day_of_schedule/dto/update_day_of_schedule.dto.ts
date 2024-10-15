import { IsInt, IsISO8601, IsOptional } from 'class-validator';

export class UpdateDayOfScheduleDto {
  @IsOptional()
  @IsInt()
  doctor_id: number;

  @IsOptional()
  @IsISO8601()
  date: Date;
}
