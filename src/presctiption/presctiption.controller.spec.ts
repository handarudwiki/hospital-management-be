import { Test, TestingModule } from '@nestjs/testing';
import { PresctiptionController } from './presctiption.controller';

describe('PresctiptionController', () => {
  let controller: PresctiptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresctiptionController],
    }).compile();

    controller = module.get<PresctiptionController>(PresctiptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
