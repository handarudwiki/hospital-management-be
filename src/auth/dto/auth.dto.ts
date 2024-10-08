import { IsISO8601, IsNotEmpty, MinLength } from 'class-validator';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  last_name: string;

  @IsNotEmpty()
  @IsISO8601()
  birth_date: string;
}

export class RefreshDto {
  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
