import { DynamicModule, Module } from '@nestjs/common';
import { MailerModuleOption } from './interfaces/mailerModuleOption.interface';

import { MAILER_MODULE_OPTION } from './constants';

import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';

@Module({})
export class MailerModule {
  /**
   * initailize a dynamic module
   * https://github.com/nestjs/nest/tree/master/sample/25-dynamic-modules
   *
   * @param options configuration of this module
   */
  static forRoot(options: MailerModuleOption): DynamicModule {
    return {
      // global module
      global: true,
      module: MailerModule,
      controllers: [MailerController],
      providers: [
        // inject options
        {
          provide: MAILER_MODULE_OPTION,
          useValue: options,
        },
        MailerService,
      ],
      exports: [MailerService],
    };
  }
}
