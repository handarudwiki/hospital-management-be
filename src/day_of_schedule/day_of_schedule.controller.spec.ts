import { Test, TestingModule } from '@nestjs/testing';
import { DayOfScheduleController } from './day_of_schedule.controller';

describe('DayOfScheduleController', () => {
  let controller: DayOfScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayOfScheduleController],
    }).compile();

    controller = module.get<DayOfScheduleController>(DayOfScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
