import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Before action
    return (
      next
        .handle()
        // After action executed
        .pipe(
          map((data: [] | string | object) => {
            const response = context.switchToHttp().getResponse<Response>();

            const responseEncryption = this.configService.get<boolean>(
              'response.encryption',
            );
            if (responseEncryption) {
              // Simulate encrypt data;
              data = JSON.stringify(data);
            }

            response.status(HttpStatus.OK).json({
              success: true,
              data,
              code: HttpStatus.OK,
              message: 'ok',
            });
          }),
        )
    );
  }
}
