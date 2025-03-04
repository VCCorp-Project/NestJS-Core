import { applyDecorators, ForbiddenException, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import storageConfig from '../config/storage.config';
import storageDiskConfig from '../../apps/config/storage-disk.config';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

type MultiFile = {
  field_name: string;
  disk: string;
  max_count: number;
};

type DiskDestination = {
  path: string;
};

export function MultiFileUpload(fileOptions: MultiFile[], localOptions?: any) {
  const multerFiles = fileOptions.map((fileOptions) => ({
    name: fileOptions.field_name,
    maxCount: fileOptions.max_count,
  })) as MulterField[];

  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor(multerFiles, {
        storage: diskStorage({
          destination: (req, file, callback) => {
            const foundFile = fileOptions.find(
              (fileOption) => fileOption.field_name === file.fieldname,
            );

            if (!foundFile) {
              throw new ForbiddenException('File not found');
            }

            const disk = storageDiskConfig().disk[
              foundFile.disk
            ] as DiskDestination;

            if (!disk) {
              throw new Error(
                `Field name: ${foundFile.field_name} with disk: ${foundFile.disk} not found`,
              );
            }
            const diskPath = disk ? disk.path : '';

            const storagePath = path.join(
              storageConfig().storage_root.local.path,
              diskPath,
            );

            fs.mkdirSync(storagePath, { recursive: true });
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
