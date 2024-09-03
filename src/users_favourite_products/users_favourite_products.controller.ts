import {Controller, Delete, Get, Patch, Post} from '@nestjs/common';
import { UsersFavouriteProductsService } from './users_favourite_products.service';
import {ApiTags} from "@nestjs/swagger";


@ApiTags('Users-to-Products')
@Controller('users-favourite-products')
export class UsersFavouriteProductsController {
  constructor(private readonly usersFavouriteProductsService: UsersFavouriteProductsService) {}

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
