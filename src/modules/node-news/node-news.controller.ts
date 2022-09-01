import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNodeNewDto } from './dto/create-node-new.dto';
import { NodeNews } from './interfaces/node-news.interface';
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

  @Get('api')
  getNewsFromApi() {
    return this.nodeNewsService.getNews();
  }

  @Get('api/filters')
  getNewsWithFilters() {
    return this.nodeNewsService.getNewsWithFilters();
  }

  @Post()
  insertNews(@Body() newsData: CreateNodeNewDto): Promise<NodeNews> {
    return this.nodeNewsService.insertNodeNews(newsData);
  }
}
