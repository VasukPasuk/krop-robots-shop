import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";
import {UserPaginationDto} from "./dto/user-pagination.dto";
import * as bcrypt from "bcrypt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async onApplicationBootstrap() {
    await this.createFirstAdmin()
  }

  private async createFirstAdmin() {
    const pass = await bcrypt.hash(this.configService.get<string>('ADMIN_PASSWORD'), 10)

    const userEmail = this.configService.get<string>('ADMIN_EMAIL')

    const userExist = await this.prisma.user.findFirst({
      where: {email: userEmail}
    })


    if (!userExist) {
      await this.prisma.user.create({
        data: {
          email: this.configService.get<string>('ADMIN_EMAIL'),
          login: this.configService.get<string>('ADMIN_LOGIN'),
          name: this.configService.get<string>('ADMIN_NAME'),
          first_surname: this.configService.get<string>('ADMIN_FIRST_SURNAME'),
          second_surname: this.configService.get<string>('ADMIN_SECOND_SURNAME'),
          password: pass,
          role: 'ADMIN',
          activation_link: "*"
        },
      });
    }
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
