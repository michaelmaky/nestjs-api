import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderChargeDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'currency of order' })
  currency?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'total amount of order' })
  totalAmount?: number;
}
