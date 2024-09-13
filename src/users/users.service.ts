import {Injectable} from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";
import {UserPaginationDto} from "./dto/user-pagination.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {
  }

  async getMany(pagination: UserPaginationDto) {
    const {limit, page, order_rule, field, search} = pagination;

    const isWhere = (field && search) && {[field]: search}
    const isField = (field && {[field]: order_rule}) || {id: "asc"}

    const [items, count] = await Promise.all([
      this.prisma.tag.findMany({
        where: isWhere,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: isField
      }),
      this.prisma.tag.count({where: isWhere})
    ])
    return {
      items,
      count,
    }
  }

  async findOne(login: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        login
      },
    })
    return user
  }
}
