import { Test, TestingModule } from '@nestjs/testing';
import { BedAllodmentService } from './bed_allodment.service';

describe('BedAllodmentService', () => {
  let service: BedAllodmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BedAllodmentService],
    }).compile();

    service = module.get<BedAllodmentService>(BedAllodmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
