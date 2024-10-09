import { IsOptional, IsString } from 'class-validator';

export default class UpdateMedicineCategoryDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description: string;
}
