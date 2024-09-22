import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as process from "node:process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
    }
  ));

  app.setGlobalPrefix('/api')

  app.enableCors({
    origin: [process.env.CLIENT_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT);
}

bootstrap();
