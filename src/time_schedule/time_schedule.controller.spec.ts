import { Test, TestingModule } from '@nestjs/testing';
import { TimeScheduleController } from './time_schedule.controller';

describe('TimeScheduleController', () => {
  let controller: TimeScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeScheduleController],
    }).compile();

    controller = module.get<TimeScheduleController>(TimeScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
