import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import storageConfig from '../config/storage.config';
import storageDiskConfig from '../../apps/config/storage-disk.config';

type SingleFile = {
  field_name: string;
  disk: string;
};

type DiskDestination = {
  path: string;
};

export function SingleFileUpload(fileOptions: SingleFile, localOptions?: any) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fileOptions.field_name, {
        storage: diskStorage({
          destination: (req, file, callback) => {
            const disk = storageDiskConfig().disk[
              fileOptions.disk
            ] as DiskDestination;
            const diskPath = disk ? disk.path : '';
            //create directory if not exist
            const storagePath = path.join(
              storageConfig().storage_root.local.path,
              diskPath,
            );
            fs.mkdirSync(storagePath, {
              recursive: true,
            });
            callback(null, storagePath);
          },
          filename: (req, file, callback) => {
            const filename = file.originalname;
            callback(null, filename);
          },
          ...localOptions,
        }),
      }),
    ),
  );
}
