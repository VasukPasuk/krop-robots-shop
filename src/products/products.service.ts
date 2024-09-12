import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";
import {ProductPaginationDto} from "./dto/product-pagination.dto";
import {CreateProductDto} from "./dto/create-product.dto";
import {FilesService} from "../files/files.service";
import {ProductIncludeDto} from "./dto/product-include.dto";
import {UpdateProductDto} from "./dto/update-product.dto";
import {Product} from "@prisma/client";

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FilesService,
  ) {
  }

  async create(createProductDto: CreateProductDto | CreateProductDto[], files: Express.Multer.File[]) {
    const isArray = Array.isArray(createProductDto);
    if (isArray) {
      return this.prisma.product.createMany({
        data: [...createProductDto],
        skipDuplicates: true
      })

    }
    const convertFilesToDBData = files.map((file: Express.Multer.File, index) => ({
      name: `${createProductDto.name}-num${index + 1}-${file.originalname}`,
      source: file.filename
    }))
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        photos: {
          createMany: {
            data: [...convertFilesToDBData],
            skipDuplicates: true
          }
        }
      }
    })
  }

  async getOne(identifier: string) {
    let product: Product
    if (!isNaN(Number(identifier))) {
      product = await this.prisma.product.findUnique({
        where: {id: Number(identifier)}
      })
    } else {
      product = await this.prisma.product.findUnique({
        where: {
          name: identifier
        }
      })
    }

    if (!product) throw new NotFoundException(`Товару з індентифікатором ${identifier} не знайдено.`)
    return product
  }

  async getMany(pagination: ProductPaginationDto) {
    const {limit, page, order_rule, field, search, include} = pagination;
    const isWhere = (field && search) && {[field]: search}
    const isField = (field && {[field]: order_rule}) || {id: "asc"}
    const items = await this.prisma.product.findMany({
      where: isWhere,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: isField,
      include: {
        photos: include ? {
          take: 1
        } : undefined,
        variants: Boolean(include.variants)
      }
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
    const fileNames = await this.prisma.photo.findMany({
      where: {name}, select: {
        source: true
      }
    })

    for (const fname of fileNames) {
      await this.fileService.delete(fname.source, "products")
    }

    return this.prisma.product.delete({where: {name}})
  }

  async updateOne(name: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {name},
      data: updateProductDto,
    })
  }


  async updateMany(createProductDtoArr: CreateProductDto[]) {
    return this.prisma.product.updateMany({data: [...createProductDtoArr]})
  }


  async getAdminAnalytics(pagination: ProductPaginationDto) {
    const {limit, page, order_rule, field, search} = pagination;
    const isWhere = (field && search) && {[field]: search}
    const isField = (field && {[field]: order_rule}) || {id: "asc"}
    const items = await this.prisma.product.findMany({
      where: isWhere,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: isField,
      include: {
        photos: {
          take: 1
        }
      }
    })
    const count = await this.prisma.product.count({where: isWhere})
    return {
      items,
      count,
    }
  }


  async getNameById(id: number) {
    const result = await this.prisma.product.findUnique({where: {id}, select: {name: true}})
    if (!result) throw new NotFoundException(`Продукту з ідентифікатором ${id} не існує.`)
    return result
  }


  async getCatalog(pagination: ProductPaginationDto) {
    const {limit, include, page, search, field, order_rule, products_count} = pagination;

    const [items, count] = await Promise.all([
      this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          photos: {
            take: 1
          },
          variants: {
            where: {
              size_label: "Стандарт"
            }
          }
        }
      }),
      this.prisma.product.count({
        where: undefined,
      }),
    ])

    return {
      items,
      count
    }
  }

  async getProductWithDetails(name: string) {
    return this.prisma.product.findUnique({
      where: {name},
      include: {
        variants: true, photos: true, category: true,
        ProductHaveTag: {
          select: {
            tag_name: true,
            tag: true
          }
        }
      }
    })
  }
}
