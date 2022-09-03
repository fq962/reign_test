/* eslint-disable no-console */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs';
import { CreateNodeNewDto } from './dto/create-node-new.dto';
import { HitsNews } from './interfaces/hits.interface';
import { NodeNews } from './interfaces/node-news.interface';
// import * as _ from 'lodash';
import { Cron, CronExpression } from '@nestjs/schedule';
import { getHitsDTO } from './dto/get-hits.dto';
import { deleteHitDTO } from './dto/delete-story.dto';

@Injectable()
export class NodeNewsService {
  constructor(
    @InjectModel('NodeNews') private readonly nodeNews: Model<NodeNews>,
    @InjectModel('HitsNews') private readonly hitsNews: Model<HitsNews>,
    private readonly httpService: HttpService,
  ) {}

  // Every hour the Cron job will be executed
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    const url = `https://hn.algolia.com/api/v1/search_by_date?query=nodejs`;
    this.httpService.get(url).subscribe(async (response) => {
      const hits = response.data.hits;
      for (let i = 0; i < hits.length; i++) {
        const checkHit =
          (await this.hitsNews
            .find({ created_at_i: hits[i].created_at_i })
            .count()) > 0;

        if (!checkHit) {
          const insertHits = new this.hitsNews(hits[i]);
          await insertHits.save();
          console.log('Hit successfully inserted');
        }
        console.log('Not Inserted');
      }
      console.log('DONE!');
    });
  }

  // Get all the hits from URL
  async getNodeNews() {
    const url = `https://hn.algolia.com/api/v1/search_by_date?query=nodejs`;
    const response = this.httpService.get(url).pipe(
      map((response) => {
        return response.data;
      }),
    );

    return response;
  }

  async getNews() {
    const news = await this.nodeNews.find();
    return news;
  }

  // Get all the hits from Database with filters
  async getNewsWithFilters(params: getHitsDTO) {
    const hits = await this.hitsNews
      .find()
      .skip((params.pageNumber - 1) * 5)
      .limit(5);

    if (params.author || params.title || params.tags) {
      const hitsTitle = await this.hitsNews
        .find({
          $or: [
            {
              author: { $regex: params.author !== '' ? params.author : 'null' },
            },
            {
              story_title: {
                $regex: params.title !== '' ? params.title : 'null',
              },
            },
            { _tags: { $all: [params.tags] } },
          ],
        })
        .skip((params.pageNumber - 1) * 5)
        .limit(5);

      return hitsTitle;
    }

    return hits;
  }

  // Insert the JSON elements into the database
  async insertNodeNews(newsData: CreateNodeNewDto) {
    const insertNews = new this.nodeNews(newsData);
    return await insertNews.save();
  }

  // Insert only the hits that are not in the database
  async insertHitsNews(hitsData: CreateNodeNewDto) {
    const insertHits = new this.hitsNews(hitsData);
    console.log(insertHits.story_id);
    const docExists =
      (await this.hitsNews.find({ story_id: insertHits.story_id }).count()) > 0;

    if (!docExists) {
      await insertHits.save();
      return true;
    }

    return false;
  }

  // Delete one element from the database
  async deleteHit(params: deleteHitDTO) {
    const removeHit = this.hitsNews.find();
    console.log(params.created_at_i);

    const removeIt = await removeHit.deleteOne({
      created_at_i: params.created_at_i,
    });

    return removeIt;
  }
}
