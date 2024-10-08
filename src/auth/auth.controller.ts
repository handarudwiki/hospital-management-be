import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshDto, SignInDto, SignUpDto } from './dto/auth.dto';
import toResponse from 'src/helpers/response';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() signUpDto: SignUpDto) {
    return toResponse(
      'user register successfully',
      await this.authService.register(signUpDto),
    );
  }

  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return toResponse(
      'login successfully',
      await this.authService.login(signInDto),
    );
  }

  @Post('refresh-token')
  async refreshToken(@Body() token: RefreshDto) {
    return toResponse(
      'refresh token success',
      await this.authService.refreshToken(token),
    );
  }
}
