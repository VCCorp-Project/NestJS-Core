import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException, UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'node:fs';

interface ExceptionResponse {
  statusCode: number;
  message: string;
  success: boolean;
  errors?: [] | object;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();

    const exceptionData: ExceptionResponse = {
      statusCode: 400,
      success: false,
      message: '',
    };

    // if validation error occur, delete the file
    if (exception instanceof UnprocessableEntityException) {
      if (request.file) {
        fs.unlinkSync(request.file.path);
      }
    }

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
