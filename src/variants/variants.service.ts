import {Injectable} from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";
import {VariantPaginationDto} from "./dto/variant-pagination.dto";
import {UpdatePhotoDto} from "../photos/dto/update-photo.dto";
import {UpdateVariantDto} from "./dto/update-variant.dto";
import {CreatePhotoDto} from "../photos/dto/create-photo.dto";
import {CreateVariantDto} from "./dto/create-variant.dto";

@Injectable()
export class VariantsService {
  constructor(private readonly prisma: PrismaService) {
  }


  async create(createVariantDto: CreateVariantDto | CreateVariantDto[]) {
    console.log(createVariantDto)

    const isArray = Array.isArray(createVariantDto);
    if (isArray) {
      return this.prisma.variant.createMany({data: [...createVariantDto]})
    }
    return this.prisma.variant.create({data: createVariantDto})
  }

  async getOne(id: number) {
    return this.prisma.variant.findUnique({
      where: {id}
    })
  }

  async getManyOfProduct(product_name: string, pagination: VariantPaginationDto) {
    const {limit, page, order_rule, field, search} = pagination;
    const isWhere = (field && search) ? {[field]: search} : undefined
    const [items, count] = await Promise.all([
      this.prisma.variant.findMany({
        where: {
          product_name
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.variant.count({
        where: {
          product_name
        }
      })
    ])
    return {
      items,
      count
    }
  }

  async updateOneById(id: number, updateVariantDto: UpdateVariantDto) {
    return this.prisma.variant.update({where: {id}, data: updateVariantDto})
  }


  async deleteOneById(id: number) {
    return this.prisma.variant.delete({
      where: {id}
    })
  }

  async deleteAllOfProduct(name: string) {
    return this.prisma.variant.deleteMany({
      where: {product_name: name},
    })
  }
}
