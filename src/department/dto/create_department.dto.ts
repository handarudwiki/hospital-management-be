import { IsNotEmpty, IsString } from 'class-validator';

export class createDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
