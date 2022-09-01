import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateNodeNewDto } from './dto/create-node-new.dto';
import { HitsNews } from './interfaces/hits.interface';
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
  getNewsWithFilters(@Query() author: string, title: string) {
    return this.nodeNewsService.getNewsWithFilters(author, title);
  }

  @Post()
  insertNews(@Body() newsData: CreateNodeNewDto): Promise<NodeNews> {
    return this.nodeNewsService.insertNodeNews(newsData);
  }

  @Post('/hits')
  insertHits(@Body() hitsNews: CreateNodeNewDto): Promise<HitsNews> {
    return this.nodeNewsService.insertHitsNews(hitsNews);
  }

  @Delete('/hits/stories/:storyId')
  removeHit(@Param() storyId: number): Promise<boolean> {
    return this.nodeNewsService.deleteHit(storyId);
  }
}
