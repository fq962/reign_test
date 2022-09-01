import { Module } from '@nestjs/common';
import { NodeNewsService } from './node-news.service';
import { NodeNewsController } from './node-news.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from 'src/schemas/node_news.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'NodeNews', schema: NewsSchema }]),
  ],
  controllers: [NodeNewsController],
  providers: [NodeNewsService],
})
export class NodeNewsModule {}
