import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBedDto {
  @IsNotEmpty()
  @IsInt()
  department_id: number;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  notes: string;
}
