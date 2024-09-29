import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Patch,
  Post,
  Query, Req,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import {ProductsService} from './products.service';
import {ProductPaginationDto} from "./dto/product-pagination.dto";
import {CreateProductDto} from "./dto/create-product.dto";
import {FilesInterceptor} from '@nestjs/platform-express';
import {ApiTags, ApiOperation} from "@nestjs/swagger";
import {UpdateProductDto} from "./dto/update-product.dto";
import {Roles} from "../decorators/roles.decorator";


@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @Get()
  getMany(@Query() pagination: ProductPaginationDto) {
    return this.productsService.getMany(pagination)
  }

  @Get(":identifier")
  getOne(@Param("identifier") identifier: string) {
    return this.productsService.getOne(identifier)
  }

  @Post()
  @UseInterceptors(FilesInterceptor("photos"))
  create(@Body() createProductDto: CreateProductDto, @UploadedFiles() photos: Array<Express.Multer.File>) {
    return this.productsService.create(createProductDto, photos)
  }

  @Delete(':name')
  deleteOneByName(@Param("name") name: string) {
    return this.productsService.deleteOne(name)
  }

  @Patch(':name')
  updateOneByName(@Param("name") name: string, @Body() data: UpdateProductDto) {
    return this.productsService.updateOne(name, data)
  }

  @Patch()
  updateMany(@Body() data: CreateProductDto[]) {
    return this.productsService.updateMany(data)
  }


  @Get("admin/list")
  getAnalytics(@Query() pagination: ProductPaginationDto) {
    return this.productsService.getAdminAnalytics(pagination)
  }

  @Get("name/:id")
  getNameById(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.getNameById(id)
  }


  @ApiOperation({
    description: "Get products for the shop catalog."
  })
  @Get("catalog/list")
  getCatalog(@Query() pagination: ProductPaginationDto) {
    return this.productsService.getCatalog(pagination)
  }


  @ApiOperation({
    description: "Get product information with details (tags, variants, photos)."
  })
  @Get("/:name/with_details")
  getProductWithDetails(@Param("name") name: string) {
    return this.productsService.getProductWithDetails(name)
  }

  @ApiOperation({
    description: "Get product information with details (tags, variants, photos) for admin page of products."
  })
  @Roles("ADMIN")
  @Get("admin-catalog/list")
  getAdminCatalog(@Query() pagination: ProductPaginationDto) {
    return this.productsService.getAdminCatalog(pagination)
  }
}




