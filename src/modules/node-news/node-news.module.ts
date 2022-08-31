import { Module } from '@nestjs/common';
import { NodeNewsService } from './node-news.service';
import { NodeNewsController } from './node-news.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [NodeNewsController],
  providers: [NodeNewsService],
})
export class NodeNewsModule {}
