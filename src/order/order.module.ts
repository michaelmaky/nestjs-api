import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Schema, CollectionName } from './schemas/order.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CollectionName, schema: Schema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
