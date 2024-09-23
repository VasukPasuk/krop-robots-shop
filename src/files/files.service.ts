import {InternalServerErrorException, Injectable} from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";
import * as uuid from 'uuid';
import * as path from "node:path";
import * as fs from "node:fs";


type DestinationUnion = "avatars" | "products"

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {
  }

  upload(file: Express.Multer.File, destination: DestinationUnion, basename: string): [string, DestinationUnion] {
    try {
      // Destruct the array splited by dot to get file name and extension
      const [fileName, fileExtension] = file.originalname.split(".");

      // Create new file new with uuid hash-string , _ separator, old file name and extension
      const newFileName = uuid.v4() + "_" + fileName + "." + fileExtension;

      // Create filepath to the selected directory
      const filePath = path.resolve(__dirname, '..', '..', 'static', `${destination}`);

      // Check if the selected directory exists
      if (!fs.existsSync(filePath)) {

        // Create the directory if the selected directory doesn't exist
        fs.mkdirSync(filePath, {recursive: true});
      }

      // Create the directory if the selected directory doesn't exist
      fs.writeFileSync(path.resolve(filePath, newFileName), file.buffer);
      return [newFileName, destination];
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async delete(fileName: string) {
    const filePath = path.join(__dirname, "..", "..", 'static', fileName);
    return fs.unlink(filePath, (e) => {
      if (e) throw new InternalServerErrorException(e.message);
    })
  }

}