import { Module } from '@nestjs/common';
import { PaymentItemService } from './payment_item.service';
import { PaymentItemController } from './payment_item.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PaymentItemService, PrismaService],
  controllers: [PaymentItemController],
})
export class PaymentItemModule {}
