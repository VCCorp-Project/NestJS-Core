import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthenticatedException extends HttpException {
  constructor(
    message: string = 'Unauthenticated',
    httpStatus = HttpStatus.UNAUTHORIZED,
  ) {
    super(message, httpStatus);
  }
}
