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
import { EncryptionService } from '../../modules/encryption/encryption.service';

interface ResponseType {
  success: boolean;
  code: number;
  message: string;
  data?: any;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(
    private configService: ConfigService,
    private encryptionService: EncryptionService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Before action
    return (
      next
        .handle()
        // After action executed
        .pipe(
          map((data: Record<string, any>) => {
            const response = context.switchToHttp().getResponse<Response>();

            const responseEncryption = this.configService.get<boolean>(
              'response.encryption',
            );

            const responseData: ResponseType = {
              success: true,
              code: HttpStatus.OK,
              message: 'ok',
            };

            const keys = Object.keys(data);
            if (keys.length > 0) {
              if (responseEncryption) {
                // Simulate encrypt data via JSON.stringify()
                keys.map((key) => (data[key] = JSON.stringify(data[key])));
              }
              responseData.data = data;
            }
            response.status(HttpStatus.OK).json(responseData);
          }),
        )
    );
  }
}
