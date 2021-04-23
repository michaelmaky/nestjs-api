import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OrderContactDto {
  @IsString()
  @ApiProperty({ description: 'consignee name' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'consignee phone no.' })
  phone: string;
}
