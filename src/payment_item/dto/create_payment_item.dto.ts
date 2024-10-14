import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentItemDto {
  @IsNotEmpty()
  @IsInt()
  doctor_id: number;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  commission: number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
