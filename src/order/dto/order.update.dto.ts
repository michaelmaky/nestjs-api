import { PartialType } from '@nestjs/mapped-types';
import { OrderCreateDto } from './order.create.dto';

export class OrderUpdateDto extends PartialType(OrderCreateDto) {}
