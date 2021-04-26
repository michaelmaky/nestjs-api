import { Module } from '@nestjs/common';
// graphql
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLModuleFactory } from './core/graphql';
// mongodb
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongodbHelper } from 'src/core';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';

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
    // GraphQL setup
    GraphQLModule.forRootAsync({
      inject: [getConnectionToken('Database')],
      useFactory: GraphQLModuleFactory,
    }),
    OrderModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
