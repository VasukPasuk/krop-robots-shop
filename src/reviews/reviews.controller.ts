import {Controller, Delete, Get, Patch, Post} from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

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
