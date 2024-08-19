import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
    }
  ));

  app.setGlobalPrefix('/api')

  await app.listen(3000);
}
bootstrap();
