import { Module } from '@nestjs/common';
import { PresctiptionController } from './presctiption.controller';
import { PresctiptionService } from './presctiption.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PresctiptionController],
  providers: [PresctiptionService, PrismaService],
})
export class PresctiptionModule {}
