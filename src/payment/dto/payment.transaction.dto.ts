import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsString,
  IsMongoId,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class PaymentTransactionDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'id of transaction, comes from payment methid , e.g. stripe',
  })
  id?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'date of transaction',
  })
  date?: Date;

  @IsString()
  @ApiProperty({ description: 'amount of transaction' })
  amount: number;

  @IsString()
  @ApiProperty({ description: 'payment method of this transaction' })
  method: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'status of payment transaction' })
  status: number;
}
