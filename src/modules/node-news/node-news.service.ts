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
import { getHitsDTO } from './dto/get-hits.dto';

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

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    console.log('Executed every hour');
    const url = `https://hn.algolia.com/api/v1/search_by_date?query=nodejs`;
    const response = this.httpService.get(url).subscribe((response) => {
      const hits = response.data.hits;

      for (let i = 0; i < hits.length; i++) {
        const insertHits = new this.hitsNews(hits[i]);
        const saveHits = insertHits.save();
        console.log(saveHits);
      }

      return true;
    });

    return response;
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

  async getNewsWithFilters(params: getHitsDTO) {
    const hits = await this.hitsNews
      .find()
      .skip((params.pageNumber - 1) * 5)
      .limit(5);

    // if (params.author !== '') {
    //   const result = _.find(hits, ['author', params.author]);
    //   return result;
    // }

    if (params.author !== '' || params.title !== '') {
      const hitsTitle = await this.hitsNews.find({
        $or: [
          { author: { $regex: params.author !== '' ? params.author : 'null' } },
          {
            story_title: {
              $regex: params.title !== '' ? params.title : 'null',
            },
          },
        ],
      });
      // const hitsTitle = await this.hitsNews.find({
      //   story_title: { $regex: params.title },
      // });

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
