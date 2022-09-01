/* eslint-disable no-console */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs';
import { CreateNodeNewDto } from './dto/create-node-new.dto';
import { NodeNews } from './interfaces/node-news.interface';

// import { CreateNodeNewDto } from './dto/create-node-new.dto';
// import { UpdateNodeNewDto } from './dto/update-node-new.dto';

@Injectable()
export class NodeNewsService {
  constructor(
    @InjectModel('NodeNews') private readonly nodeNews: Model<NodeNews>,
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

  async getNewsWithFilters() {
    const news = await this.nodeNews.find();
    const jsonNews = JSON.stringify(news);
    const parseNews = JSON.parse(jsonNews);
    console.log('news', jsonNews);
    console.log('hits: ', parseNews[0]['hits']);

    return parseNews[0]['hits'];
  }

  async insertNodeNews(newsData: CreateNodeNewDto) {
    const insertNews = new this.nodeNews(newsData);
    return await insertNews.save();
  }
}
