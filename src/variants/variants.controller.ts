import {Controller, Delete, Get, Patch, Post} from '@nestjs/common';
import {VariantsService} from './variants.service';

@Controller('variants')
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {
  }

  @Get()
  getMany() {

  }

  @Get(":id")
  getOne() {
  }

  @Post()
  createMany() {
  }

  @Post()
  createOne() {
  }

  @Delete()
  deleteMany() {
  }

  @Delete(':id')
  deleteOneById() {
  }

  @Patch(':id')
  updateOneById() {
  }

  @Patch()
  updateMany() {
  }
}
