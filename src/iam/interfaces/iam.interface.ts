import { ObjectID } from 'mongodb';
import { Document } from 'mongoose';

export interface Iam extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectID;

  type: string;

  subType: string;

  description: string;

  credentials: any;

  params: any;

  isActive: boolean;
}
