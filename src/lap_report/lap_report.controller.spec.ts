import { Test, TestingModule } from '@nestjs/testing';
import { LapReportController } from './lap_report.controller';

describe('LapReportController', () => {
  let controller: LapReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LapReportController],
    }).compile();

    controller = module.get<LapReportController>(LapReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
