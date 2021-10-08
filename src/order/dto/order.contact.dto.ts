import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class OrderContactDto {
  @IsString()
  @ApiProperty({ description: 'consignee name' })
  name: string;

  @IsString()
  @MaxLength(8)
  @ApiProperty({ description: 'consignee phone no.' })
  phone: string;
}
