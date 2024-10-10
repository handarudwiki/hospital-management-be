import { Test, TestingModule } from '@nestjs/testing';
import { LapReportService } from './lap_report.service';

describe('LapReportService', () => {
  let service: LapReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LapReportService],
    }).compile();

    service = module.get<LapReportService>(LapReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
