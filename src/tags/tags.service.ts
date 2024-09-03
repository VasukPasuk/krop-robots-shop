import {Injectable} from '@nestjs/common';
import {CreateTagDto} from "./dto/create-tag.dto";
import {PrismaService} from "../utils/prisma.service";
import {TagPaginationDto} from "./dto/tag-pagination.dto";
import {UpdateTagDto} from "./dto/update-tag.dto";

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createTagDto: CreateTagDto | CreateTagDto[]) {
    const isArray = Array.isArray(createTagDto);
    if (isArray) {
      return this.prisma.tag.createMany({
        data: [...createTagDto],
        skipDuplicates: true
      })

    }
    return this.prisma.tag.create({
      data: createTagDto
    })
  }

  async getOne(name: string) {
    return this.prisma.tag.findFirst({where: {name}})
  }

  async getMany(pagination: TagPaginationDto) {
    const {limit, page, order_rule, field, search} = pagination;
    const isWhere = (field && search) && {[field]: search}
    const isField = (field && {[field]: order_rule}) || {id: "asc"}
    const items = await this.prisma.tag.findMany({
      where: isWhere,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: isField
    })
    const count = await this.prisma.tag.count({where: isWhere})
    return {
      items,
      count,
    }
  }

  async deleteMany() {
    return this.prisma.tag.deleteMany()
  }

  async deleteOne(name: string) {
    return this.prisma.tag.delete({where: {name}})
  }

  async updateOne(name: string, data: UpdateTagDto) {
    return this.prisma.tag.update({
      where: {name},
      data: data
    })
  }

  async updateMany(createTagDtoArr: CreateTagDto[]) {
    return this.prisma.tag.updateMany({data: [...createTagDtoArr]})
  }

  async getManyOnProduct(name: string, pagination: TagPaginationDto) {
    const {page, limit} = pagination;

    const [tags, total] = await Promise.all([
      this.prisma.tag.findMany({where: {name}, take: limit, skip: (page - 1) * limit}),
      this.prisma.tag.count({where: {name}})
    ])

    return {
      items: tags,
      count: total,
    }
  }



  async deleteOneByName(name: string) {
    return this.prisma.tag.delete({where: {name}})
  }
}
