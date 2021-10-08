import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

import { PaymentTransaction } from './paymentTransaction.interface';
import { Order } from 'src/order/interfaces';

export interface Payment extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * reference order
   */
  order: Order | Order['_id'];

  /**
   * payment status
   */
  status: number;

  /**
   * payment transactions
   */
  transactions: PaymentTransaction[];
}
