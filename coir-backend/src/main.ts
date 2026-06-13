import 'dotenv/config';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { join } from 'path';

import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );

  app.enableCors({
    origin:
      process.env.FRONTEND_URL ??
      'http://localhost:3000',

    credentials: true,
  });

  app.useStaticAssets(
    join(
      __dirname,
      '..',
      'uploads',
    ),
    {
      prefix: '/uploads/',
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port =
    process.env.PORT ?? 4000;

  await app.listen(port);

  console.log(
    `Server is running on ${port}`,
  );
}

bootstrap();