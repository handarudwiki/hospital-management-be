import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
