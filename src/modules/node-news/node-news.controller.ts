import { Controller, Get } from '@nestjs/common';
import { NodeNewsService } from './node-news.service';
// import { CreateNodeNewDto } from './dto/create-node-new.dto';
// import { UpdateNodeNewDto } from './dto/update-node-new.dto';

@Controller('node-news')
export class NodeNewsController {
  constructor(private readonly nodeNewsService: NodeNewsService) {}

  @Get()
  getNews() {
    return this.nodeNewsService.getNodeNews();
  }
}
