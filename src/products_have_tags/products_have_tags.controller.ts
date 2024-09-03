import {Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { ProductsHaveTagsService } from './products_have_tags.service';
import {ProductOnTagPaginationDto} from "./dto/prod-on-tag-pagination.dto";

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

  @Get('/products/:name')
  getTagsRelatedToProduct(@Param("name") name: string, @Query() pagination: ProductOnTagPaginationDto) {
    return this.productsHaveTagsService.getTagsRelatedToProduct(name, pagination)
  }
}
