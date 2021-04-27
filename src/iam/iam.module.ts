import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CRYPTO_KEY } from './constants';
import { IamService } from './iam.service';
import { Schema, CollectionName } from './schemas/iam.schemas';

@Module({})
export class IamModule {
  /**
   * initailize a dynamic module
   * https://github.com/nestjs/nest/tree/master/sample/25-dynamic-modules
   *
   * @param cryptoKey key that used for decrypt credentials
   */
  static forRoot(cryptoKey?: string): DynamicModule {
    return {
      // global module
      global: true,
      imports: [
        MongooseModule.forFeature([{ name: CollectionName, schema: Schema }]),
      ],
      module: IamModule,
      providers: [
        // inject cryptoKey to IamService
        {
          provide: CRYPTO_KEY,
          useValue: cryptoKey,
        },
        IamService,
      ],
      exports: [IamService],
    };
  }
}
