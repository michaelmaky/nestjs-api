import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';

import { MongodbHelper } from 'src/core';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    // mongodb connection
    MongooseModule.forRoot(
      MongodbHelper.getConnectionString({
        hosts: [
          process.env.MONGODB_HOST0,
          process.env.MONGODB_HOST1,
          process.env.MONGODB_HOST2,
        ],
        port: parseInt(process.env.MONGODB_PORT, 10),
        dbName: process.env.MONGODB_DBNAME,
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
        isSRV: process.env.MONGODB_HOST_SRV === 'true',
        isSSL: process.env.MONGODB_OPTION_SSL === 'true',
      }),
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        connectionName: 'Database',
        connectionFactory: (connection) => {
          // global plugin for mongoose
          // https://docs.nestjs.com/techniques/mongodb#plugins
          // ...
          return connection;
        },
      },
    ),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
