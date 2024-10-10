import { Module } from '@nestjs/common';
import { LapReportService } from './lap_report.service';
import { LapReportController } from './lap_report.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [LapReportService, PrismaService],
  controllers: [LapReportController],
})
export class LapReportModule {}
