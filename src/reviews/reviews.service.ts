import { Injectable } from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";
import {PaginationReviewDto} from "./dto/pagination-review.dto";
import {CreateReviewDto} from "./dto/create-review.dto";

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateReviewDto) {
    return this.prisma.review.create({
      data: dto
    })
  }

  async getMany(pagination: PaginationReviewDto) {
    const {limit, page, flag} = pagination;
    const [items, count] = await Promise.all([
      this.prisma.review.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          created_at: {newest: "asc", latest: "desc"}[flag] as "asc" | "desc"
        }
      }),
      this.prisma.review.count()
    ])
    return {
      items,
      count
    }
  }

  deleteOne(id: number) {
    return this.prisma.review.delete({
      where: {id}
    })
  }
}
