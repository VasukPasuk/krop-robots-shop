import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {CategoryPaginationDto} from "./dto/category-pagination.dto";
import {CreateCategoryDto} from "./dto/create-category.dto";


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  getMany(@Query() pagination: CategoryPaginationDto) {
    return this.categoriesService.getMany(pagination)
  }

  @Get(":name")
  getOne(@Param("name") name: string) {
    return this.categoriesService.getOne(name)
  }

  @Post()
  create(@Body() createColorDto: CreateCategoryDto[] | CreateCategoryDto) {
    return this.categoriesService.create(createColorDto)
  }

  @Delete()
  deleteMany() {
    return this.categoriesService.deleteMany()
  }

  @Delete(':name')
  deleteOneByName(@Param("name") name: string) {
    return this.categoriesService.deleteOne(name)
  }

  @Patch(':name')
  updateOneByName(@Param("name") name: string, @Body() data: CreateCategoryDto) {
    return this.categoriesService.updateOne(name, data)
  }

  @Patch()
  updateMany(@Body() data: CreateCategoryDto[]) {
    return this.categoriesService.updateMany(data)
  }
}
