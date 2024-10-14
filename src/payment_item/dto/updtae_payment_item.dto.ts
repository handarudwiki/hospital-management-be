import { IsInt, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdatePaymentItemDto {
  @IsOptional()
  @IsInt()
  doctor_id: number;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  commission: number;

  @IsOptional()
  @IsInt()
  quantity: number;
}
