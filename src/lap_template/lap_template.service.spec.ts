import { Test, TestingModule } from '@nestjs/testing';
import { LapTemplateService } from './lap_template.service';

describe('LapTemplateService', () => {
  let service: LapTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LapTemplateService],
    }).compile();

    service = module.get<LapTemplateService>(LapTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
