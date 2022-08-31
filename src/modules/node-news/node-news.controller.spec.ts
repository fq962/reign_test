import { Test, TestingModule } from '@nestjs/testing';
import { NodeNewsController } from './node-news.controller';
import { NodeNewsService } from './node-news.service';

describe('NodeNewsController', () => {
  let controller: NodeNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodeNewsController],
      providers: [NodeNewsService],
    }).compile();

    controller = module.get<NodeNewsController>(NodeNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
