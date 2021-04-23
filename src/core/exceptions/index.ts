import { HttpException } from '@nestjs/common';
import { HttpStatus } from '../constants';

export class BadRequestException extends HttpException {
  constructor(message: any) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: any) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
