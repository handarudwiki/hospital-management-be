import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_ACCESS'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, PrismaService, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
