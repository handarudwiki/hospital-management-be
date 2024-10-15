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
import { LapReportModule } from './lap_report/lap_report.module';
import { AppointmentModule } from './appointment/appointment.module';
import { TimeScheduleModule } from './time_schedule/time_schedule.module';
import { TestModule } from '../test/test.module';
import { PaymentItemModule } from './payment_item/payment_item.module';
import { DocumentModule } from './document/document.module';
import { PresctiptionModule } from './presctiption/presctiption.module';
import { DayOfScheduleModule } from './day_of_schedule/day_of_schedule.module';

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

    LapReportModule,

    AppointmentModule,

    TimeScheduleModule,

    TestModule,

    PaymentItemModule,

    DocumentModule,

    PresctiptionModule,

    DayOfScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
