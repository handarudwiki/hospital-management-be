import { Test, TestingModule } from '@nestjs/testing';
import { DayOfScheduleService } from './day_of_schedule.service';

describe('DayOfScheduleService', () => {
  let service: DayOfScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayOfScheduleService],
    }).compile();

    service = module.get<DayOfScheduleService>(DayOfScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
