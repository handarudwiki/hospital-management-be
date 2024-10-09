import { Test, TestingModule } from '@nestjs/testing';
import { BedAllodmentController } from './bed_allodment.controller';

describe('BedAllodmentController', () => {
  let controller: BedAllodmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BedAllodmentController],
    }).compile();

    controller = module.get<BedAllodmentController>(BedAllodmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
