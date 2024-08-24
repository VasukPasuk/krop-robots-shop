import { Injectable } from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";
import {ProductPaginationDto} from "./dto/product-pagination.dto";
import {CreateProductDto} from "./dto/create-product.dto";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createColorDto: CreateProductDto | CreateProductDto[]) {
    const isArray = Array.isArray(createColorDto);
    if (isArray) {
      return this.prisma.product.createMany({data: [...createColorDto]})
    }
    return this.prisma.product.create({data: createColorDto})
  }

  async getOne(name: string) {
    return this.prisma.product.findFirst({where: {name}})
  }

  async getMany(pagination: ProductPaginationDto) {
    const {limit, page, order_rule, field, search} = pagination;
    const isWhere = (field && search) && {[field]: search}
    const isField = (field && {[field]: order_rule}) || { id: "asc" }
    const items = await this.prisma.product.findMany({
      where: isWhere,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: isField
    })
    const count = await this.prisma.product.count({where: isWhere})
    return {
      items,
      count,
    }
  }

  async deleteMany() {
    return this.prisma.product.deleteMany()
  }

  async deleteOne(name: string) {
    return this.prisma.product.delete({where: {name}})
  }

  async updateOne(name: string, data: CreateProductDto) {
    return this.prisma.product.update({
      where: {name},
      data: data
    })
  }

  async updateMany(createColorDtoArr: CreateProductDto[]) {
    return this.prisma.product.updateMany({data: [...createColorDtoArr]})
  }
}
