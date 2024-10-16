import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsInt()
  department_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  charge: number;

  @IsNotEmpty()
  @IsNumber()
  doctor_commission: number;
}
