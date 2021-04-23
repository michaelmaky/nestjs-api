import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentCheckoutDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'stripe source id' })
  source?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;
}
