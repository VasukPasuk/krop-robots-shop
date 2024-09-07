import {Injectable} from '@nestjs/common';

import {BasePaginationDto} from "../DTO/base-pagination.dto";
import {PrismaService} from "../utils/prisma.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {UpdateCategoryDto} from "./dto/update-category.dto";

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
    const {limit, page, order_rule, field, search} = pagination;
    const isWhere = (field && search) && {[field]: search}
    const isField = (field && {[field]: order_rule}) || {id: "asc"}
    const items = await this.prisma.category.findMany({
      where: isWhere,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: isField
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

  updateOne(name: string, data: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: {name: name},
      data: {
        description: data.description,
        name: data.name,
      }
    })
  }

  async updateMany(createCategoryDtoArr: CreateCategoryDto[]) {
    return this.prisma.category.updateMany({data: [...createCategoryDtoArr]})
  }
}
