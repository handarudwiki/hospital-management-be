import { Module } from '@nestjs/common';
import { LapTemplateService } from './lap_template.service';
import { LapTemplateController } from './lap_template.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [LapTemplateService, PrismaService],
  controllers: [LapTemplateController],
})
export class LapTemplateModule {}
