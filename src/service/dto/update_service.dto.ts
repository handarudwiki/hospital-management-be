import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto {
  @IsOptional()
  @IsInt()
  department_id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  charge: number;

  @IsOptional()
  @IsNumber()
  doctor_commission: number;
}
