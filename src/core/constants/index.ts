import { HttpStatus as NestHttpStatus } from '@nestjs/common';

export const HttpStatus = {
  ...NestHttpStatus,
  INVALIDATE: 65532,
};
