// single-file.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { diskStorage } from 'multer';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class SingleFileInterceptor implements NestInterceptor {
  constructor() {
    // You can add any custom configuration logic here
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle();
  }
}
