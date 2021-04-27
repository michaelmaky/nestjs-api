import { DynamicModule, Module } from '@nestjs/common';

import { AWSServiceOptionModel } from './models';

import { AWSS3Service } from './aws.s3.service';
import { AWSSQSService } from './aws.sqs.service';

@Module({})
export class AWSModule {
  /**
   * initailize a dynamic module
   * https://github.com/nestjs/nest/tree/master/sample/25-dynamic-modules
   *
   * @param cryptoKey key that used for decrypt credentials
   */
  static forRoot(options: AWSServiceOptionModel): DynamicModule {
    return {
      // global module
      global: true,
      module: AWSModule,
      providers: [
        // inject options to services
        {
          provide: '',
          useValue: options,
        },
        AWSS3Service,
        AWSSQSService,
      ],
      exports: [AWSS3Service, AWSSQSService],
    };
  }
}
