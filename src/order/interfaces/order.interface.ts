import { ObjectID } from 'mongodb';
import { Document } from 'mongoose';

import { OrderCharge } from './order.charge.inteface';
import { OrderContact } from './order.contact.inteface';

export interface Order extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectID;

  /**
   * generated order no.
   */
  orderNo: string;

  /**
   * order date
   */
  date: Date;

  /**
   * order consignee (receiver) contact
   */
  consignee: OrderContact;

  /**
   * order person contact
   */
  contactAddress: string;

  /**
   * order amount
   */
  charge: OrderCharge;

  /**
   * optional remarks
   */
  remarks: string;

  createdAt: Date;

  updatedAt: Date;
}
