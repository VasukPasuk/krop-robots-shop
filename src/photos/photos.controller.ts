import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import {PhotosService} from './photos.service';
import {CreatePhotoDto} from "./dto/create-photo.dto";
import {PhotoPaginationDto} from "./dto/photo-pagination.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {
  }

  @Get()
  getMany(@Query() pagination: PhotoPaginationDto) {
    return this.photosService.getMany(pagination)
  }

  @Get(":id")
  getOne(@Param("id") id: number) {
    return this.photosService.getOne(id)
  }


  @Get("products/:name")
  async getManyOfProduct(@Param("name") name: string, @Query() pagination: PhotoPaginationDto) {
    return this.photosService.getManyOfProduct(name, pagination)
  }

  @Post()
  @UseInterceptors(FilesInterceptor("photos"))
  create(@Body() createPhotoDto: CreatePhotoDto, @UploadedFiles() photos: Array<Express.Multer.File>) {
    return this.photosService.create(createPhotoDto, photos)
  }

  @Delete()
  deleteMany() {
    return this.photosService.deleteMany()
  }

  @Delete(':id')
  deleteOneByName(@Param("id", ParseIntPipe) id: number) {
    return this.photosService.deleteOne(id)
  }

  @Patch(':id')
  updateOneById(@Param("id") id: number, @Body() data: CreatePhotoDto) {
    return this.photosService.updateOne(id, data)
  }

  @Patch()
  updateMany(@Body() data: CreatePhotoDto[]) {
    return this.photosService.updateMany(data)
  }
}
