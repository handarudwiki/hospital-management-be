import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTimeScheduleDto {
  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  start_time: string;

  @IsNotEmpty()
  @IsString()
  end_time: string;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsNotEmpty()
  @IsInt()
  user_id: number;
}
