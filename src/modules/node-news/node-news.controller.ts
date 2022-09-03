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
import { deleteHitDTO } from './dto/delete-story.dto';
import { getHitsDTO } from './dto/get-hits.dto';
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
  getNewsWithFilters(@Query() params: getHitsDTO) {
    return this.nodeNewsService.getNewsWithFilters(params);
  }

  @Post()
  insertNews(@Body() newsData: CreateNodeNewDto): Promise<NodeNews> {
    return this.nodeNewsService.insertNodeNews(newsData);
  }

  @Post('/hits')
  insertHits(@Body() hitsNews: CreateNodeNewDto): Promise<boolean> {
    return this.nodeNewsService.insertHitsNews(hitsNews);
  }

  @Delete('/hits/createdAt/:created_at_i')
  removeHit(@Param() created_at_i: deleteHitDTO): Promise<boolean> {
    return this.nodeNewsService.deleteHit(created_at_i);
  }
}
