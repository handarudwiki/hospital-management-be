import { Module } from '@nestjs/common';
import { BedController } from './bed.controller';
import { BedService } from './bed.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BedController],
  providers: [BedService, PrismaService],
})
export class BedModule {}
