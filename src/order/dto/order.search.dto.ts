import {
  IsString,
  IsDate,
  // IsMongoId,
  IsOptional,
  // ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderSearchDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  q?: string;

  @IsDate()
  @IsOptional()
  dateFr?: Date;

  @IsDate()
  @IsOptional()
  dateTo?: Date;

  @IsOptional()
  @ApiPropertyOptional({ description: 'name of consignee' })
  @IsString()
  consigneeName?: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'phone of consignee' })
  @IsString()
  consigneePhone?: string;

  @IsOptional()
  @IsString()
  contactAddress: string;
}
