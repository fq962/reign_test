import { Test, TestingModule } from '@nestjs/testing';
import { NodeNewsService } from './node-news.service';

describe('NodeNewsService', () => {
  let service: NodeNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeNewsService],
    }).compile();

    service = module.get<NodeNewsService>(NodeNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
