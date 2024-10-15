import { IsInt, IsISO8601, IsNotEmpty } from 'class-validator';

export class CreateDayOfScheduleDto {
  @IsNotEmpty()
  @IsInt()
  doctor_id: number;

  @IsNotEmpty()
  @IsISO8601()
  date: Date;
}
