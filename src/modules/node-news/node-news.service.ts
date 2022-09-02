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
import { Cron, CronExpression } from '@nestjs/schedule';

// import { CreateNodeNewDto } from './dto/create-node-new.dto';
// import { UpdateNodeNewDto } from './dto/update-node-new.dto';

@Injectable()
export class NodeNewsService {
  constructor(
    @InjectModel('NodeNews') private readonly nodeNews: Model<NodeNews>,
    @InjectModel('HitsNews') private readonly hitsNews: Model<HitsNews>,
    private readonly httpService: HttpService,
  ) {}

  // @Cron('1 * * * * *')
  // handleCron() {
  //   console.log('Called when the current ', Date());
  // }

  @Cron(CronExpression.EVERY_10_HOURS)
  async handleCron() {
    console.log('Called when the current ', Date());
    const url = `https://hn.algolia.com/api/v1/search_by_date?query=nodejs`;
    const response = this.httpService.get(url).subscribe((response) => {
      const hits = response.data.hits;
      console.log(hits.length);
      for (let i = 0; i < hits.length; i++) {
        const insertHits = new this.hitsNews(hits[i]);
        const saveHits = insertHits.save();

        // console.log('tengo N regisstros: ', hits[i]); //use i instead of 0
      }
      return true;
    });

    return response;
    // const news = await this.nodeNews.find();
    // console.log(JSON.stringify(news));
  }

  async getNodeNews() {
    const url = `https://hn.algolia.com/api/v1/search_by_date?query=nodejs`;
    const response = this.httpService.get(url).pipe(
      map((response) => {
        const hits = response.data.hits;

        return response.data;
      }),
    );

    return response;
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

  async deleteHit(params: any) {
    const removeHit = this.hitsNews.find();
    console.log(params.storyId);

    const removeIt = await removeHit.deleteOne({
      story_id: parseInt(params.storyId),
    });

    return removeIt;
  }
}
