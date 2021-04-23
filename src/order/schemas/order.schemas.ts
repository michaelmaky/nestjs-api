import { Schema as MongooseSchema, SchemaTypes } from 'mongoose';

export const CollectionName = 'Orders';
export const Schema = new MongooseSchema(
  {
    orderNo: { type: SchemaTypes.String, required: true },
    date: { type: SchemaTypes.Date, default: Date.now },
    // consignee contact
    consignee: {
      name: { type: SchemaTypes.String, required: false, default: '' },
      phone: { type: SchemaTypes.String, required: false, default: '' },
    },
    contactAddress: {
      type: SchemaTypes.String,
      required: true,
    },
    // charges of the order
    charge: {
      // currency
      currency: { type: SchemaTypes.String },
      // total amount
      totalAmount: { type: SchemaTypes.Number, required: true, default: 0 },
    },
    remarks: {
      type: SchemaTypes.String,
      required: false,
    },
  },
  {
    collection: CollectionName,
    timestamps: true,
  },
);
