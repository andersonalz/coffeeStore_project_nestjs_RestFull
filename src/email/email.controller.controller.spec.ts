import { Test, TestingModule } from '@nestjs/testing';
import { EmailControllerController } from './email.controller.controller';

describe('EmailControllerController', () => {
  let controller: EmailControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailControllerController],
    }).compile();

    controller = module.get<EmailControllerController>(EmailControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
