import { IsOptional, IsString } from 'class-validator';

export class updateDepartmentDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description: string;
}
