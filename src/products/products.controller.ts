import {Controller, Delete, Get, Param, ParseBoolPipe, Patch, Post} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
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
