/* eslint-disable no-console */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs';
import { CreateNodeNewDto } from './dto/create-node-new.dto';
import { HitsNews } from './interfaces/hits.interface';
import { NodeNews } from './interfaces/node-news.interface';
import * as _ from 'lodash';

// import { CreateNodeNewDto } from './dto/create-node-new.dto';
// import { UpdateNodeNewDto } from './dto/update-node-new.dto';

@Injectable()
export class NodeNewsService {
  constructor(
    @InjectModel('NodeNews') private readonly nodeNews: Model<NodeNews>,
    @InjectModel('HitsNews') private readonly hitsNews: Model<HitsNews>,
    private readonly httpService: HttpService,
  ) {}

  async getNodeNews() {
    const url = `https://hn.algolia.com/api/v1/search_by_date?query=nodejs`;
    return this.httpService.get(url).pipe(map((response) => response.data));
  }

  async getNews() {
    const news = await this.nodeNews.find();
    return news;
  }

  async getNewsWithFilters(params: any, title: any) {
    const hits = await this.hitsNews.find();

    if (params.author !== '') {
      const result = _.find(hits, ['author', params.author]);
      return result;
    }

    if (params.title !== '') {
      // TODO: Cambiar a que use DTO y el title
      const hitsTitle = await this.hitsNews.find({
        comment_text: { $regex: params.title },
      });

      return hitsTitle;
    }

    console.log(hits);

    return hits;
  }

  async insertNodeNews(newsData: CreateNodeNewDto) {
    const insertNews = new this.nodeNews(newsData);
    return await insertNews.save();
  }

  async insertHitsNews(hitsData: CreateNodeNewDto) {
    const insertHits = new this.hitsNews(hitsData);
    return await insertHits.save();
  }
}
