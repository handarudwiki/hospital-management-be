import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TestService, PrismaService],
  exports: [TestService],
})
export class TestModule {}
