import { Module } from '@nestjs/common';
import { CaseHistoryService } from './case_history.service';
import { CaseHistoryController } from './case_history.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CaseHistoryService, PrismaService],
  controllers: [CaseHistoryController],
})
export class CaseHistoryModule {}
