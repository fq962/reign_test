// import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodeNewsModule } from './modules/node-news/node-news.module';

@Module({
  imports: [NodeNewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
