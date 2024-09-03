import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import { TagsService } from './tags.service';
import {TagPaginationDto} from "./dto/tag-pagination.dto";
import {ApiTags} from "@nestjs/swagger";
import {CreateTagDto} from "./dto/create-tag.dto";
import {UpdateTagDto} from "./dto/update-tag.dto";


@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getMany(@Query() pagination: TagPaginationDto) {
    return this.tagsService.getMany(pagination);
  }

  @Get(":name")
  getOne(@Param("name") name: string) {
    return this.tagsService.getOne(name)
  }

  @Get("/products/:name")
  getManyOnProduct(@Param('name') name: string, @Query() pagination: TagPaginationDto) {
    return this.tagsService.getManyOnProduct(name, pagination)
  }

  @Post()
  create(@Body() createTagDto: CreateTagDto[] | CreateTagDto) {
    return this.tagsService.create(createTagDto)
  }

  @Delete()
  deleteMany() {
    return this.tagsService.deleteMany()
  }

  @Delete(':name')
  deleteOneByName(@Param('name') name: string) {
    return this.tagsService.deleteOneByName(name)
  }

  @Patch(':name')
  updateOneById(@Param("name") name: string, @Body() data: UpdateTagDto) {
    return this.tagsService.updateOne(name, data)
  }

  @Patch()
  updateMany() {
    return
  }
}
