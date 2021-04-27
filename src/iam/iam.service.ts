import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { decrypt } from 'src/core/crypto';
import { CRYPTO_KEY } from './constants';
import { IamSearchModel } from './models';
import { Iam, IamFieldOption } from './interfaces';

@Injectable()
export class IamService {
  constructor(
    @InjectModel('Iams')
    private readonly iamRepository: Model<Iam>,
    @Inject(CRYPTO_KEY) private readonly cryptoKey: string,
  ) {}

  public async find(query: IamSearchModel) {
    return this.iamRepository.find(query).exec();
  }

  public async findOne(
    query: IamSearchModel,
    options: IamFieldOption = { credential: { decrypt: true } },
  ) {
    // find Iam
    const iam = await this.iamRepository.findOne(query).exec();

    if (
      iam &&
      options.credential.decrypt &&
      options?.credential.fields.length > 0
    ) {
      for (const field of options.credential.fields) {
        // decrypt values one by one
        if (iam.credentials[field]) {
          // TODO, decrypt function
          iam.credentials[field] = decrypt(
            iam.credentials[field],
            this.cryptoKey,
          );
        }
      }
    }

    return iam;
  }
}
