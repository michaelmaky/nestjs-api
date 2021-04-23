import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RandomHelper } from 'src/core';

import { Order } from './interfaces';
import { OrderCreateDto, OrderUpdateDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Orders')
    private readonly orderRepository: Model<Order>,
  ) {}

  public async create(orderCreateDto: OrderCreateDto) {
    // random generate order No. for demo
    const ordeNo = RandomHelper.randomString('string', 6);

    orderCreateDto.orderNo = ordeNo;

    return await this.orderRepository.create(orderCreateDto);
  }

  public async findAll() {
    return await this.orderRepository.find({}).exec();
  }

  public async findOne(_id: string) {
    return await this.orderRepository.find({ _id: _id }).exec();
  }

  public async update(_id: string, orderUpdateDto: OrderUpdateDto) {
    const updateModel: any = { ...orderUpdateDto };
    const updateOrder = await this.orderRepository
      .findByIdAndUpdate(_id, updateModel, { new: true })
      .exec();

    return updateOrder;
  }

  public async remove(id: string) {
    return await this.orderRepository.deleteOne({ _id: id }).exec();
  }
}
