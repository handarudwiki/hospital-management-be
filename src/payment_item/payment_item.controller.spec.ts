import { Test, TestingModule } from '@nestjs/testing';
import { PaymentItemController } from './payment_item.controller';

describe('PaymentItemController', () => {
  let controller: PaymentItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentItemController],
    }).compile();

    controller = module.get<PaymentItemController>(PaymentItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
