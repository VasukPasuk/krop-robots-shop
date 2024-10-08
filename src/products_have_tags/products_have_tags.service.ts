import {Injectable} from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";
import {ProductOnTagPaginationDto} from "./dto/prod-on-tag-pagination.dto";
import {UnpinDto} from "./dto/unpin.dto";
import {AttachDto} from "./dto/attach.dto";

@Injectable()
export class ProductsHaveTagsService {
  constructor(private readonly prisma: PrismaService) {
  }

  async getTagsRelatedToProduct(product_name: string, pagination: ProductOnTagPaginationDto) {
    const {page, limit} = pagination;
    const [tags, total] = await Promise.all([
      this.prisma.productHaveTag.findMany({where: {product_name}, take: limit, skip: (page - 1) * limit}),
      this.prisma.productHaveTag.count({where: {product_name}})
    ])

    const productWithTags = await this.prisma.product.findUnique({
      where: {
        name: product_name,
      },
      include: {
        ProductHaveTag: {
          include: {
            tag: true,
          },
        },
      },
    });

    const searched_tags = productWithTags.ProductHaveTag.map((productTag) => productTag.tag)

    return {
      items: searched_tags,
      count: total,
    }
  }

  async attachTagsToProduct(product_name: string, tag_name: string[]) {
    return this.prisma.productHaveTag.createMany({
      data: [...tag_name.map((id) => ({product_name, tag_name: id}))]
    })
  }


  async attachTagToProduct(data: AttachDto) {
    return this.prisma.productHaveTag.create({
      data: {
        tag_name: data.tag_name,
        product_name: data.product_name
      }
    })
  }

  unpinTagFromProduct(data: UnpinDto) {
    return this.prisma.productHaveTag.delete({
      where: {
        tag_name_product_name: {
          tag_name: data.tag_name,
          product_name: data.product_name
        }
      }
    })
  }
}
