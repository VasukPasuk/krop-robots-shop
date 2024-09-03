import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import { ColorsService } from './colors.service';
import {CreateColorDto} from "./dto/create-color.dto";
import {ColorPaginationDto} from "./dto/color-pagination.dto";

@Controller('colors')
export class ColorsController {
  constructor(
    private readonly colorsService: ColorsService,
  ) {}

  @Get()
  getMany(@Query() pagination: ColorPaginationDto) {
    return this.colorsService.getMany(pagination)
  }

  @Get(":name")
  getOne(@Param("name") name: string) {
    return this.colorsService.getOne(name)
  }

  @Post()
  create(@Body() createColorDto: CreateColorDto[] | CreateColorDto) {
    return this.colorsService.create(createColorDto)
  }

  @Delete()
  deleteMany() {
    return this.colorsService.deleteMany()
  }

  @Delete(':name')
  deleteOneByName(@Param("name") name: string) {
    return this.colorsService.deleteOne(name)
  }

  @Patch(':id')
  updateOneByName(@Param("id", ParseIntPipe) id: number, @Body() data: CreateColorDto) {
    return this.colorsService.updateOne(id, data)
  }

  @Patch()
  updateMany(@Body() data: CreateColorDto[]) {
    return this.colorsService.updateMany(data)
  }
}
