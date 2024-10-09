import { Module } from '@nestjs/common';
import { BedAllodmentController } from './bed_allodment.controller';
import { BedAllodmentService } from './bed_allodment.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BedAllodmentController],
  providers: [BedAllodmentService, PrismaService],
})
export class BedAllodmentModule {}
