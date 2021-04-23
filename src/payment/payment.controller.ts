import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentCheckoutDto, PaymentSearchDto } from './dto';
// import { PaymentUpdateDto } from './dto/payment.update.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  find(@Query() query: PaymentSearchDto) {
    return this.paymentService.find(query);
  }

  @Post('checkout/:orderId')
  checkout(
    @Param('orderId') orderId: string,
    @Body() paymentCheckoutDto: PaymentCheckoutDto,
  ) {
    return this.paymentService.checkout(orderId, paymentCheckoutDto);
  }
}
