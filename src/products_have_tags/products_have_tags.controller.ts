import {Controller, Delete, Get, Patch, Post} from '@nestjs/common';
import { ProductsHaveTagsService } from './products_have_tags.service';

@Controller('products-have-tags')
export class ProductsHaveTagsController {
  constructor(private readonly productsHaveTagsService: ProductsHaveTagsService) {}

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
