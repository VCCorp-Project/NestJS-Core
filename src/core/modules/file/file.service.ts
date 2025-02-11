import multer, { diskStorage } from 'multer';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  createMulterInstance(disk: string) {
    return multer({
      storage: diskStorage({
        destination: this.configService.get<string>(`${disk}.destination`),
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    });
  }
}
