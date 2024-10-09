import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import * as fs from 'fs-extra';

export function UploadFile(fieldname: string, folder: string) {
  const directoryPath = `./public/uploads/${folder}`;
  fs.ensureDirSync(directoryPath);
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldname, {
        storage: diskStorage({
          destination: `./public/uploads/${folder}`,
          filename: (req, file, callback) => {
            const randomName = `${uuidv4()}${extname(file.originalname)}`;
            callback(null, randomName);
          },
        }),
      }),
    ),
  );
}
