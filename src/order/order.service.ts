import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import moment from 'moment';

import { RandomHelper } from 'src/core';

import { Order } from './interfaces';
import { OrderCreateDto, OrderSearchDto, OrderUpdateDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Orders')
    private readonly orderRepository: Model<Order>,
  ) {}

  public _castQuery(searchModel: OrderSearchDto) {
    const query: any = { $and: [] };
    const {
      q,
      dateFr,
      dateTo,
      consigneeName,
      consigneePhone,
      contactAddress,
    } = searchModel;

    // q support search fields [orderNo, remarks]
    if (q) {
      const regx = new RegExp(q, 'i');
      query.$and.push({
        $or: [
          {
            orderNo: regx,
          },
          {
            remarks: regx,
          },
        ],
      });
    }

    // search date range
    if (dateFr && dateTo) {
      query.$and.push({
        date: {
          $gte: moment(dateFr).startOf('day').toDate(),
          $lte: moment(dateTo).startOf('day').toDate(),
        },
      });
    }

    // consignee name
    if (consigneeName) {
      query.$and.push({ 'consignee.name': consigneeName });
    }

    // consignee phone
    if (consigneePhone) {
      query.$and.push({ 'consignee.phone': consigneePhone });
    }

    // contactAddress
    if (contactAddress) {
      query.$and.push({ contactAddress });
    }

    return query;
  }

  public async create(orderCreateDto: OrderCreateDto) {
    // random generate order No. for demo
    const ordeNo = RandomHelper.randomString('string', 6);

    orderCreateDto.orderNo = ordeNo;

    return await this.orderRepository.create(orderCreateDto);
  }

  public async find(searchModel: OrderSearchDto) {
    const query = this._castQuery(searchModel);
    return await this.orderRepository.find(query).exec();
  }

  public async findById(_id: string) {
    return await this.orderRepository.findById(_id).exec();
  }

  public async findOne(_id: string) {
    return await this.orderRepository.findOne({ _id: _id }).exec();
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
