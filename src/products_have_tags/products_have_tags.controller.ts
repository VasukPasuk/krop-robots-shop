import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {ProductsHaveTagsService} from './products_have_tags.service';
import {ProductOnTagPaginationDto} from "./dto/prod-on-tag-pagination.dto";
import {AttachDto} from "./dto/attach.dto";
import {UnpinDto} from "./dto/unpin.dto";

@Controller('products-have-tags')
export class ProductsHaveTagsController {
  constructor(private readonly productsHaveTagsService: ProductsHaveTagsService) {
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


  @Post("/attach")
  attachTagToProduct(@Body() data: AttachDto) {
    return this.productsHaveTagsService.attachTagToProduct(data)
  }

  @Delete("/unpin/:tagName/:productName")
  unpinTagFromProduct(@Param("tagName") tagName: string, @Param("productName") productName: string) {
    return this.productsHaveTagsService.unpinTagFromProduct({product_name:productName, tag_name:tagName})
  }

  @Get('/products/:name')
  getTagsRelatedToProduct(@Param("name") name: string, @Query() pagination: ProductOnTagPaginationDto) {
    return this.productsHaveTagsService.getTagsRelatedToProduct(name, pagination)
  }
}
