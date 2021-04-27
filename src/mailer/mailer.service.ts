import * as nodemailer from 'nodemailer';
import { Inject, Injectable } from '@nestjs/common';

import { MAILER_MODULE_OPTION } from './constants';
import { SendMailModel } from './models';
import { MailerModuleOption } from './interfaces';
// import { AWSSQSService } from '../Aws/aws.sqs.service';
import { IamService } from '../Iam/iam.service';

@Injectable()
export class MailerService {
  constructor(
    private readonly iamService: IamService,
    // private readonly sqsService: AWSSQSService,
    @Inject(MAILER_MODULE_OPTION)
    private readonly mailerOptions: MailerModuleOption,
  ) {}

  /**
   * base function to send mail through nodemailer client
   * @param sendMailModel the mail content
   */
  public async sendMail(sendMailModel: SendMailModel) {
    // get IAM
    const iam = await this.iamService.findOne(
      {
        subType: 'ses',
      },
      {
        credential: {
          decrypt: true,
          fields: ['accessKeyId', 'secretAccessKey'],
        },
      },
    );

    if (!iam) return;

    // create mailer transport by using credentials
    const mailerClient: nodemailer.Transporter = nodemailer.createTransport({
      host: iam.params.host,
      port: iam.params.port,
      auth: {
        user: iam.credentials.accessKeyId,
        pass: iam.credentials.secretAccessKey,
      },
    });

    // send email
    return mailerClient.sendMail({
      from: iam.params.from,
      to: sendMailModel.to,
      subject: sendMailModel.subject,
      html: sendMailModel.body,
      attachments: sendMailModel.attachments,
    });
  }
}
