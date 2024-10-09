import { Module } from '@nestjs/common';
import { MedicineCategoryService } from './medicine_category.service';
import { MedicineCategoryController } from './medicine_category.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [MedicineCategoryService, PrismaService],
  controllers: [MedicineCategoryController],
})
export class MedicineCategoryModule {}
