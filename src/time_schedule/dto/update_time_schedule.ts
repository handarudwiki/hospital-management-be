import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTimeScheduleDto {
  @IsOptional()
  @IsIn([
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ])
  week_day: string;

  @IsOptional()
  @IsString()
  start_time: string;

  @IsOptional()
  @IsString()
  end_time: string;

  @IsOptional()
  @IsString()
  duration: string;

  @IsOptional()
  @IsInt()
  user_id: number;
}
