import { Injectable } from '@nestjs/common';

import {BasePaginationDto} from "../DTO/base-pagination.dto";
import {PrismaService} from "../utils/prisma.service";
import {CreateCategoryDto} from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {
  }
  async create(createCategoryDto: CreateCategoryDto | CreateCategoryDto[]) {
    const isArray = Array.isArray(createCategoryDto);
    if (isArray) {
      return this.prisma.category.createMany({data: [...createCategoryDto]})
    }
    return this.prisma.category.create({data: createCategoryDto})
  }

  async getOne(name: string) {
    return this.prisma.category.findFirst({where: {name}})
  }

  async getMany(pagination: BasePaginationDto) {
    const {limit, page, order_rule, field} = pagination;
    const isWhere = field && {[field]: pagination[field]}
    const items = this.prisma.category.findMany({
      where: isWhere,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: field && {
        [field]: order_rule,
      }
    })
    const count = await this.prisma.category.count({where: isWhere})
    return {
      items,
      count,
    }
  }

  async deleteMany() {
    return this.prisma.category.deleteMany()
  }

  async deleteOne(name: string) {
    return this.prisma.category.delete({where: {name}})
  }

  async updateOne(name: string, data: CreateCategoryDto) {
    return this.prisma.category.update({
      where: {name},
      data: data
    })
  }

  async updateMany(createCategoryDtoArr: CreateCategoryDto[]) {
    return this.prisma.category.updateMany({data: [...createCategoryDtoArr]})
  }
}
