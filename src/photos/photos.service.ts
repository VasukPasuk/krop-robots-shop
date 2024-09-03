import {Injectable} from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";
import {PhotoPaginationDto} from "./dto/photo-pagination.dto";
import {CreatePhotoDto} from "./dto/create-photo.dto";
import {VariantPaginationDto} from "../variants/dto/variant-pagination.dto";

@Injectable()
export class PhotosService {
  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  // If files length > 1 , use create many
  // In another case, create singular photo record
  async create({product_name}: CreatePhotoDto, files: Express.Multer.File[]) {
    if (files.length > 1) {
      const mappedPhotoDto = files.map((data, idx) => ({product_name, source: data.filename}))
      return this.prisma.photo.createMany({data: [...mappedPhotoDto]})
    }
    return this.prisma.photo.create({data: {product_name, source: files[0].filename}, })
  }

  async getOne(id: number) {
    return this.prisma.photo.findFirst({where: {id}})
  }

  async getMany(pagination: PhotoPaginationDto) {
    const {limit, page} = pagination;
    const [items, count] = await Promise.all([
      this.prisma.photo.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.photo.count(),
    ]);

    return {
      items,
      count,
    };
  }

  async getManyOfProduct(product_name: string, pagination: PhotoPaginationDto) {
    const {limit, page, order_rule, field, search} = pagination;
    const isWhere = (field && search) ? {[field]: search} : undefined
    const [items, count] = await Promise.all([
      this.prisma.photo.findMany({
        where: {product_name},
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.photo.count({where: {product_name}})
    ])
    return {
      items,
      count
    }
  }

  async deleteMany() {
    return this.prisma.photo.deleteMany()
  }

  async deleteOne(id: number) {
    return this.prisma.photo.delete({where: {id}})
  }

  async updateOne(id: number, data: CreatePhotoDto) {
    return this.prisma.photo.update({
      where: {id},
      data: data
    })
  }

  async updateMany(createPhotoDtoArr: CreatePhotoDto[]) {
    return this.prisma.photo.updateMany({data: [...createPhotoDtoArr]})
  }
}
