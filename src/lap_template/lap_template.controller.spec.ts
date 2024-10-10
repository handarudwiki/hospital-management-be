import { Test, TestingModule } from '@nestjs/testing';
import { LapTemplateController } from './lap_template.controller';

describe('LapTemplateController', () => {
  let controller: LapTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LapTemplateController],
    }).compile();

    controller = module.get<LapTemplateController>(LapTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
