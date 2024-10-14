import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RefreshDto, SignInDto, SignUpDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { LoginResponse } from './response/login.response';
import { RegisterResponse } from './response/register.response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(signUpDto: SignUpDto): Promise<RegisterResponse> {
    try {
      const user = await this.userService.findByEmail(signUpDto.email);
      if (user) {
        throw new ConflictException('Email already taken');
      }
      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
      signUpDto.password = hashedPassword;
      const newUser = await this.userService.create(signUpDto);
      return {
        id: newUser.id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async login(loginDto: SignInDto): Promise<LoginResponse> {
    try {
      const user = await this.userService.findByEmail(loginDto.email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const accessToken = this.jwtService.sign({ sub: user.id });
      const refreshToken = this.generateRefreshToken(user);
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async refreshToken(dto: RefreshDto): Promise<LoginResponse> {
    const payload = this.jwtService.verify(dto.refresh_token, {
      secret: process.env.JWT_SECRET_REFRESH,
    });
    const accessToken = this.jwtService.sign({ sub: payload.sub });
    return {
      accessToken,
      refreshToken: dto.refresh_token,
    };
  }

  private generateRefreshToken(user: any) {
    return this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '7d', secret: process.env.JWT_SECRET_REFRESH },
    );
  }
}
