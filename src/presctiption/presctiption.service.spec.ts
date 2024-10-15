import { Test, TestingModule } from '@nestjs/testing';
import { PresctiptionService } from './presctiption.service';

describe('PresctiptionService', () => {
  let service: PresctiptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresctiptionService],
    }).compile();

    service = module.get<PresctiptionService>(PresctiptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
