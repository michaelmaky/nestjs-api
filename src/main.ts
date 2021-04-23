// inject env variable first
require('dotenv').config({
  path:
    './configs/env/.env-' +
    (process.env.NODE_ENV ? process.env.NODE_ENV : 'development'),
});

import { NestFactory } from '@nestjs/core';
// import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
// import packageJson from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  console.info(
    'nestjs-api run in [ %s ] environment at port %s ...',
    process.env.NODE_ENV || 'development',
    process.env.PORT,
  );
}
bootstrap();
