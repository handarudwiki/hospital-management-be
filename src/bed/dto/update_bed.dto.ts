import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateBedDto {
  @IsOptional()
  @IsInt()
  department_id: number;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  notes: string;
}
