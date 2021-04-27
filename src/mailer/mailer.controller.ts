import { Body, Post, Controller } from '@nestjs/common';

import { SendMailModel } from './models';
import { MailerService } from './mailer.service';

@Controller('mailers')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  public async sendEmail(@Body() body: SendMailModel) {
    return this.mailerService.sendMail(body);
  }
}
