import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  // Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderCreateDto, OrderSearchDto, OrderUpdateDto } from './dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() orderCreateDto: OrderCreateDto) {
    return this.orderService.create(orderCreateDto);
  }

  @Get()
  find(@Query() query: OrderSearchDto) {
    return this.orderService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() orderUpdateDto: OrderUpdateDto) {
    return this.orderService.update(id, orderUpdateDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(id);
  // }
}
