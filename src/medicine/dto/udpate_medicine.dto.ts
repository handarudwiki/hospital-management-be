import {
  IsInt,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMedicineDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  category_id: number;

  @IsOptional()
  @IsString()
  company: string;

  @IsOptional()
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsString()
  instruction?: string;

  @IsOptional()
  @IsNumber()
  purchase_price: number;

  @IsOptional()
  @IsNumber()
  sale_price: number;

  @IsOptional()
  @IsISO8601()
  expire_date: Date;
}
