// import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodeNewsModule } from './modules/node-news/node-news.module';

@Module({
  imports: [
    NodeNewsModule,
    MongooseModule.forRoot('mongodb://localhost/test_db'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
