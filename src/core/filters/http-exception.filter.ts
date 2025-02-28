import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

interface ExceptionResponse {
  statusCode: number;
  message: string;
  success: boolean;
  errors?: [] | object;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const exceptionData : ExceptionResponse = {
      statusCode: 400,
      success: false,
      message: '',
    };
    if (typeof exception.getResponse() === 'object') {
      const exceptionResponseObject =
        exception.getResponse() as ExceptionResponse;
      exceptionData.errors = exceptionResponseObject.errors;
      exceptionData.statusCode = exceptionResponseObject.statusCode;
      exceptionData.message = exceptionResponseObject.message;
    } else {
      exceptionData.statusCode = exception.getStatus();
      exceptionData.message = exception.message;
    }

    return response.status(exceptionData.statusCode).json({
      code: exceptionData.statusCode,
      message: exceptionData.message,
      success: false,
      errors: exceptionData.errors,
    });
  }
}
