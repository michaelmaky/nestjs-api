export interface AWSServiceOptionModel {
  s3: {
    username: string;

    folder: string;
  };

  sqs: {
    // queue name
    queueName: string;

    isEnable: boolean;
  };

  cloudwatch: {
    isEnable?: boolean;
  };
}
