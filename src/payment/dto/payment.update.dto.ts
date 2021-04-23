import { PartialType } from '@nestjs/swagger';
import { PaymentCreateDto } from './payment.create.dto';

export class PaymentUpdateDto extends PartialType(PaymentCreateDto) {}
