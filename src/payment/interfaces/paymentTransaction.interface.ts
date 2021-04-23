import { ObjectID } from 'mongodb';

export interface PaymentTransaction {
  _id?: ObjectID;

  /**
   * transaction id
   */
  id?: string;

  /**
   * transaction date
   */
  date: Date;

  /**
   * transaction amount
   */
  amount: number;

  /**
   * transaction payment method
   */
  method?: string;

  /**
   * payment transaction status
   */
  status: number;
}
