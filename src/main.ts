import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('TEST FOR REIGN')
    .setDescription('TEST FOR REIGN APPLICATION')
    .setVersion('1.0')
    .setContact(
      'David Fernando Quintanilla',
      'df.quintanillah@gmail.com',
      '+504 3143-3099',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Pipe Config
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
