import {
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMedicineDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  category_id: number;

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsString()
  instruction?: string;

  @IsNotEmpty()
  @IsNumber()
  purchase_price: number;

  @IsNotEmpty()
  @IsNumber()
  sale_price: number;

  @IsNotEmpty()
  @IsISO8601()
  expire_date: Date;
}
