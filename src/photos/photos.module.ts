import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import {PrismaService} from "../utils/prisma.service";
import {FilesService} from "../files/files.service";
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {v4 as uuidv4} from "uuid";
import {extname} from "path";

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './static/products',
        filename: (_, file, callback) => {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
      fileFilter: (_, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return callback(new Error('Unsupported file type'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  ],
  controllers: [PhotosController],
  providers: [PhotosService, PrismaService, FilesService],
})
export class PhotosModule {}
