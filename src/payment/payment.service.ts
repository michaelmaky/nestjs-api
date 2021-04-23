import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BadRequestException } from 'src/core';
import { Stripe } from 'src/lib/stripe';
import { StripeChargeCreateParams } from 'src/lib/stripe/models';

import { OrderService } from '../order/order.service';

import { Payment } from './interfaces';
import {
  PaymentCreateDto,
  PaymentCheckoutDto,
  PaymentSearchDto,
  PaymentTransactionDto,
} from './dto';
// import { PaymentUpdateDto } from './dto/payment.update.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel('Payments')
    private readonly paymentRepository: Model<Payment>,
    private readonly orderService: OrderService,
  ) {}

  public async create(paymentCreateDto: PaymentCreateDto) {
    return await this.paymentRepository.create(paymentCreateDto);
  }

  public async find(searchModel: PaymentSearchDto) {
    return await this.paymentRepository.find(searchModel).exec();
  }

  public async findOne(_id: string) {
    return await this.paymentRepository.findOne({ _id: _id }).exec();
  }

  public async checkout(
    orderId: string,
    paymentCheckoutDto: PaymentCheckoutDto,
  ) {
    const order = await this.orderService.findOne(orderId);
    // check order exists
    if (!order) throw new BadRequestException('order not exists');
    // check order amount match with payment amount
    if (order?.charge.totalAmount !== paymentCheckoutDto.amount)
      throw new BadRequestException('order amount not match');

    // checkout
    const checkoutResult = await this.checkoutByStripe(
      process.env.STRIPE_SECRET_KEY,
      {
        source: paymentCheckoutDto.source,
        amount: paymentCheckoutDto.amount,
        currency: order.charge.currency,
        description: `Order ${order.orderNo}`,
        capture: true,
      },
    );

    // find payment by order id
    const payment = await this.paymentRepository
      .findOne({ order: order._id })
      .exec();

    const transaction: PaymentTransactionDto = {
      id: checkoutResult.id,
      method: 'STRIPE',
      amount: paymentCheckoutDto.amount,
      // Success
      status: 1,
    };

    // insert new payment document or update transaction of payment
    // this code structure is for later if we need to support partial payment
    let updatePayment;
    if (payment) {
      // update payment status
      updatePayment = await this.paymentRepository
        .findByIdAndUpdate(
          payment._id,
          {
            // PAID
            status: 100,
            $push: {
              transactions: transaction,
            },
          },
          { new: true },
        )
        .exec();
      return updatePayment;
    } else {
      const transactions: Array<PaymentTransactionDto> = [];
      transactions.push(transaction);

      const newPayment: PaymentCreateDto = {
        date: new Date(),
        amount: paymentCheckoutDto.amount,
        status: 100,
        transactions: transactions,
      };

      updatePayment = await this.create(newPayment);
    }

    // TODO, may update order status later
    return updatePayment;
  }

  /**
   * checkout by using stripe
   * @param {string} key stripe key
   * @param {string} source A payment source to be charged.
   * @param {object} param A payment charge parameters
   */
  public async checkoutByStripe(key: string, param: StripeChargeCreateParams) {
    // create charge from stripe
    let stripeCharge;
    const stripe = new Stripe(key);
    try {
      stripeCharge = await stripe.createCharge(param);
    } catch (e) {
      // charge error, throw translated message
      throw new BadRequestException({ code: `err_stripe_${e.code}` });
    }

    return stripeCharge;
  }
}
