import { Schema as MongooseSchema, SchemaTypes } from 'mongoose';

const PaymentTransactionSchema = new MongooseSchema(
  {
    // id of payment, e.g. stripe payment id
    id: { type: SchemaTypes.String, required: false },
    date: { type: SchemaTypes.Date, default: Date.now, required: true },
    amount: { type: SchemaTypes.Number, default: 0 },
    // payment method
    method: { type: SchemaTypes.String, required: true },
    // status, FAIL = 0, SUCCESS = 1
    status: { type: SchemaTypes.Number, required: true, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const CollectionName = 'Payments';
export const Schema = new MongooseSchema(
  {
    order: { type: SchemaTypes.ObjectId, ref: 'Orders' },
    transactions: [PaymentTransactionSchema],
    // status, NOT_PAID = 0, PAID = 100
    status: { type: SchemaTypes.Number, required: true, default: 0 },
  },
  {
    collection: CollectionName,
    timestamps: true,
  },
);
