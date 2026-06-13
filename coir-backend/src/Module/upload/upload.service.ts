import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  getFileUrl(
    file: Express.Multer.File,
  ) {
    return {
      url: `/uploads/${file.filename}`,
    };
  }
}