import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { ProductsService } from './products.service';
import {ProductPaginationDto} from "./dto/product-pagination.dto";
import {CreateProductDto} from "./dto/create-product.dto";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @Get()
  getMany(@Query() pagination: ProductPaginationDto) {
    return this.productsService.getMany(pagination)
  }

  @Get(":name")
  getOne(@Param("name") name: string) {
    return this.productsService.getOne(name)
  }

  @Post()
  create(@Body() createColorDto: CreateProductDto[] | CreateProductDto) {
    return this.productsService.create(createColorDto)
  }

  @Delete()
  deleteMany() {
    return this.productsService.deleteMany()
  }

  @Delete(':name')
  deleteOneByName(@Param("name") name: string) {
    return this.productsService.deleteOne(name)
  }

  @Patch(':name')
  updateOneByName(@Param("name") name: string, @Body() data: CreateProductDto) {
    return this.productsService.updateOne(name, data)
  }

  @Patch()
  updateMany(@Body() data: CreateProductDto[]) {
    return this.productsService.updateMany(data)
  }

}
