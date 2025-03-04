import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  MulterField,
  MulterOptions,
} from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as fs from 'node:fs';

interface SingleFile {
  field_name: string;
  folder_destination: string;
  max_count: number;
}

@Injectable()
export class MultiFilesInterceptor implements NestInterceptor {
  private multerFiles: MulterField[];
  private localOptions?: MulterOptions;

  // constructor(files: SingleFile[], localOptions?: MulterOptions) {
  //   this.multerFiles = files.map((file) => ({
  //     name: file.field_name,
  //     max_count: file.max_count,
  //     folder_destination: file.folder_destination,
  //   }));
  //   this.localOptions = localOptions || {};
  // }

  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // FileFieldsInterceptor(this.multerFiles, {
    //   storage: diskStorage({
    //     destination: (req, file, callback) => {
    //       //create directory if not exist
    //       let storagePath = path.join(
    //         process.env.PWD || '',
    //         'src/apps/storage',
    //       );
    //       if (file.fieldname == 'cover_image') {
    //         storagePath = path.join(storagePath, 'cover_image');
    //       } else {
    //         storagePath = path.join(storagePath, 'background');
    //       }
    //
    //       fs.mkdirSync(storagePath, {
    //         recursive: true,
    //       });
    //       callback(null, storagePath);
    //     },
    //     filename: (req, file, callback) => {
    //       const filename = file.originalname;
    //       callback(null, filename);
    //     },
    //     ...this.localOptions,
    //   }),
    // });


    return next.handle();
  }
}
