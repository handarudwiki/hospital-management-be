import { Module } from '@nestjs/common';
import { DayOfScheduleService } from './day_of_schedule.service';
import { DayOfScheduleController } from './day_of_schedule.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DayOfScheduleService, PrismaService],
  controllers: [DayOfScheduleController],
})
export class DayOfScheduleModule {}
