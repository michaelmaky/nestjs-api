import {
  IsNumber,
  IsDate,
  IsMongoId,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { PaymentTransactionDto } from './payment.transaction.dto';

export class PaymentCreateDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsNumber()
  status?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PaymentTransactionDto)
  @ApiProperty({ description: 'transactions' })
  transactions?: PaymentTransactionDto[];
}
