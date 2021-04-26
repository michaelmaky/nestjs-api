import { UseFilters } from '@nestjs/common';
import {
  Args,
  Query,
  // Parent,
  Mutation,
  Resolver,
  // ResolveField,
  // Subscription,
} from '@nestjs/graphql';
import { GraphQLExceptionFilter } from 'src/core';

import { OrderCreateDto, OrderSearchDto, OrderUpdateDto } from './dto';
import { OrderService } from './order.service';

@Resolver('Order')
@UseFilters(GraphQLExceptionFilter)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query()
  async getOrder(@Args('id') id: string) {
    return this.orderService.findById(id);
  }

  // @Query()
  // async getOrders(@Args('query') query: OrderSearchDto) {
  //   return this.orderService.find(query);
  // }

  // @Mutation()
  // async createOrder(@Args('orderCreateDto') orderCreateDto: OrderCreateDto) {
  //   return this.orderService.create(orderCreateDto);
  // }

  // @Mutation()
  // async updateOrder(
  //   @Args('id') id: string,
  //   @Args('orderUpdateDto') orderUpdateDto: OrderUpdateDto,
  // ) {
  //   return this.orderService.update(id, orderUpdateDto);
  // }
}
