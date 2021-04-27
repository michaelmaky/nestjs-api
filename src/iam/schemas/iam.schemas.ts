import { Schema as MongooseSchema, SchemaTypes } from 'mongoose';

export const CollectionName = 'Iams';
export const Schema = new MongooseSchema(
  {
    // e.g. AWS, GCP, Aliyun, Azure ...
    type: { type: String, required: true },
    // ses, s3, Aliyun OSS ...
    subType: { type: String },
    description: { type: String, required: true },
    credentials: SchemaTypes.Mixed,
    params: SchemaTypes.Mixed,
    isActive: { type: Boolean, required: true },
  },
  {
    collection: CollectionName,
    timestamps: true,
  },
);

// sample seed data
/*
 * AWS SES
{
  "_id": "{Object ID}",
  "type": "AWS",
  "subType": "ses",
  "description": "aws ses iam (ses-smtp-user.{your_aws_account} N.Virginia)",
  "credentials": {
    "name": "ses-smtp-user.{your_aws_account}",
    "accessKeyId": "{access KeyId generate from IAM}",
    "secretAccessKey": "{secret AccessKey generate from IAM}"
  },
  "params": {
    "from": "{DISPLAY_NAME} <no-reply@{your_domain.com}>",
    "to": "no-reply@{your_domain.com}",
    "port": 587,
    "host": "email-smtp.us-east-1.amazonaws.com"
  },
  "isActive": true
}
*/
