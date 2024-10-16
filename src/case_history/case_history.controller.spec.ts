import { Test, TestingModule } from '@nestjs/testing';
import { CaseHistoryController } from './case_history.controller';

describe('CaseHistoryController', () => {
  let controller: CaseHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaseHistoryController],
    }).compile();

    controller = module.get<CaseHistoryController>(CaseHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
