import { readFile } from 'fs';
import { promisify } from 'util';
import S3 from 'aws-sdk/clients/s3';
import { Injectable, Inject } from '@nestjs/common';

import { AWSServiceOptionModel } from './models';
import { AWS_SERVICE_OPTIONS } from './constants';
import { IamService } from '../Iam/iam.service';

const readFileAsync = promisify(readFile);

@Injectable()
export class AWSS3Service {
  private s3: S3;
  private bucket: string;
  private urlPrefix: string;

  constructor(
    private readonly iamService: IamService,
    @Inject(AWS_SERVICE_OPTIONS)
    private readonly options: AWSServiceOptionModel,
  ) {
    this.init()
      .then(() => {
        console.info('Create s3 Client successfully.');
      })
      .catch(() => {
        throw new Error('Fails to create s3 client.');
      });
  }

  /**
   * initialize AWS S3 instance
   */
  private async init() {
    // get IAM for S3
    const iam = await this.iamService.findOne(
      {
        'credentials.name': this.options.s3.username,
      },
      {
        credential: {
          decrypt: true,
          fields: ['accessKeyId', 'secretAccessKey'],
        },
      },
    );

    // throw exception if not found
    if (!iam) {
      throw Error(
        'Fail to initialize s3.\n' +
          'Message: Fails to get IAM.\n' +
          `User name: ${this.options.s3.username || 'Undefined S3 USERNAME'}`,
      );
    }

    // init S3 client
    this.s3 = new S3({
      region: iam.params.region,
      accessKeyId: iam.credentials.accessKeyId,
      secretAccessKey: iam.credentials.secretAccessKey,
    });
    this.bucket = iam.params.bucket;
    this.urlPrefix = iam.params.host;
  }

  /**
   * delete file in bucket
   * @param filePath file want to delete
   */
  public async deleteFile(filePath: string) {
    return this.s3
      .deleteObject({ Bucket: this.bucket, Key: filePath })
      .promise();
  }

  /**
   * upload file to S3 bucket
   * @param localPath local path of file to be uploaded
   * @param filePath destination of file upload
   * @param options s3.putObject options
   */
  public async upload(localPath: string, filePath: string, options?: any) {
    // read file to buffer
    const fileContent = await readFileAsync(localPath);

    // upload to S3
    const response = await this.s3
      .putObject({
        Bucket: this.bucket,
        Key: filePath,
        ACL: 'public-read',
        Body: fileContent,
        ...options,
      })
      .promise();

    // check upload success or not
    if (response.$response.httpResponse.statusCode === 200) {
      // return url
      return `${this.urlPrefix}/${filePath}`;
    }

    throw new Error(JSON.stringify(response.$response));
  }
}
