import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {PaginationReviewDto} from "./dto/pagination-review.dto";
import {CreateReviewDto} from "./dto/create-review.dto";


@ApiTags("Reviews")
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto)
  }

  @Get()
  getMany(@Query() reviewsPaginationDto: PaginationReviewDto) {
    return this.reviewsService.getMany(reviewsPaginationDto)
  }

  @Delete(":id")
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.deleteOne(id)
  }
}
