import { IsOptional, IsString } from 'class-validator';

export class UpdateLapTemplateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  template: string;
}
