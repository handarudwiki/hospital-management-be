import { Module } from '@nestjs/common';
import { TimeScheduleService } from './time_schedule.service';
import { TimeScheduleController } from './time_schedule.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TimeScheduleService, PrismaService],
  controllers: [TimeScheduleController],
})
export class TimeScheduleModule {}
