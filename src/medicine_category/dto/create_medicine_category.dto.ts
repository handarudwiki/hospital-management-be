import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateMedicineCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
