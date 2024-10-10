import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DepartmentModule } from './department/department.module';
import { DoctorModule } from './doctor/doctor.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MedicineModule } from './medicine/medicine.module';
import { MedicineCategoryModule } from './medicine_category/medicine_category.module';
import { BedModule } from './bed/bed.module';
import { BedAllodmentModule } from './bed_allodment/bed_allodment.module';
import { LapTemplateModule } from './lap_template/lap_template.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
      serveRoot: '/storage',
    }),
    UserModule,
    AuthModule,
    PrismaModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    DepartmentModule,

    DoctorModule,

    MedicineModule,

    MedicineCategoryModule,

    BedModule,

    BedAllodmentModule,

    LapTemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
