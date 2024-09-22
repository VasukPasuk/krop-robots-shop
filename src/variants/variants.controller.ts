import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {VariantsService} from './variants.service';
import {VariantPaginationDto} from "./dto/variant-pagination.dto";
import {UpdateVariantDto} from "./dto/update-variant.dto";
import {ApiTags} from "@nestjs/swagger";
import {CreateVariantDto} from "./dto/create-variant.dto";


@ApiTags("Variants")
@Controller('variants')
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {
  }

  @Get(":id")
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.variantsService.getOne(id)
  }

  @Get("products/:name")
  getManyOfProduct(@Param('name') name: string, @Query() pagination: VariantPaginationDto) {
    return this.variantsService.getManyOfProduct(name, pagination)
  }

  @Post()
  create(@Body() createVariantDto: CreateVariantDto | CreateVariantDto[]) {
    return this.variantsService.create(createVariantDto)
  }


  @Delete("/products/:name")
  deleteAllOfProduct(@Param('name') name: string) {
    return this.variantsService.deleteAllOfProduct(name)
  }

  @Delete(':id')
  deleteOneById(@Param('id', ParseIntPipe) id: number) {
    return this.variantsService.deleteOneById(id);
  }

  @Patch(':id')
  updateOneById(@Body() updateVariantDto: UpdateVariantDto, @Param('id', ParseIntPipe) id: number) {
    return this.variantsService.updateOneById(id, updateVariantDto)
  }
}
