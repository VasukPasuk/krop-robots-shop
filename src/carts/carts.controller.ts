import {Controller, Delete, Get, Patch, Post} from '@nestjs/common';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}
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
