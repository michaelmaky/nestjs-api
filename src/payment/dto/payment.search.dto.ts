import { IsMongoId, IsOptional } from 'class-validator';

export class PaymentSearchDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsMongoId()
  @IsOptional()
  order: string;
}
