import {Injectable} from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";
import {CreateColorDto} from "./dto/create-color.dto";
import {BasePaginationDto} from "../DTO/base-pagination.dto";

@Injectable()
export class ColorsService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createColorDto: CreateColorDto | CreateColorDto[]) {
    const isArray = Array.isArray(createColorDto);
    if (isArray) {
      return this.prisma.color.createMany({data: [...createColorDto]})
    }
    return this.prisma.color.create({data: createColorDto})
  }

  async getOne(name: string) {
    return this.prisma.color.findFirst({where: {name}})
  }

  async getMany(pagination: BasePaginationDto) {
    const {limit, page, order_rule, field} = pagination;
    const isWhere = field && {[field]: pagination[field]}
    const items = this.prisma.color.findMany({
      where: isWhere,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: field && {
        [field]: order_rule,
      }
    })
    const count = await this.prisma.color.count({where: isWhere})
    return {
      items,
      count,
    }
  }

  async deleteMany() {
    return this.prisma.color.deleteMany()
  }

  async deleteOne(name: string) {
    return this.prisma.color.delete({where: {name}})
  }

  async updateOne(name: string, data: CreateColorDto) {
    return this.prisma.color.update({
      where: {name},
      data: data
    })
  }

  async updateMany(createColorDtoArr: CreateColorDto[]) {
    return this.prisma.color.updateMany({data: [...createColorDtoArr]})
  }
}
