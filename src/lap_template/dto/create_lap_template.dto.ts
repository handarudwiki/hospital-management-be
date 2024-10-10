import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLapTemplateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  template: string;
}
