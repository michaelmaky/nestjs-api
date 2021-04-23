import {
  IsString,
  IsDate,
  IsMongoId,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { OrderContactDto } from './order.contact.dto';
import { OrderChargeDto } from './order.charge.dto';

export class OrderCreateDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  orderNo?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @ValidateNested()
  consignee?: OrderContactDto;

  @IsOptional()
  @IsString()
  contactAddress: string;

  @IsOptional()
  @ValidateNested()
  charges?: OrderChargeDto;

  @IsOptional()
  @IsString()
  remarks?: string;
}
