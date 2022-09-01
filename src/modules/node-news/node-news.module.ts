import { Module } from '@nestjs/common';
import { NodeNewsService } from './node-news.service';
import { NodeNewsController } from './node-news.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from 'src/schemas/node_news.schema';
import { HitsSchema } from 'src/schemas/hits.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: 'NodeNews', schema: NewsSchema },
      { name: 'HitsNews', schema: HitsSchema },
    ]),
  ],
  controllers: [NodeNewsController],
  providers: [NodeNewsService],
})
export class NodeNewsModule {}
