import {Injectable, OnModuleInit} from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";
import {UserPaginationDto} from "./dto/user-pagination.dto";
import * as bcrypt from "bcrypt";
import process from "node:process";

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.createFirstAdmin()
  }

  private async createFirstAdmin() {
    const pass = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
    const admin = await this.prisma.user.upsert({
      where: {email: process.env.ADMIN_LOGIN},
      update: {
        email: process.env.ADMIN_LOGIN,
        login: process.env.ADMIN_LOGIN,
        name: process.env.ADMIN_NAME,
        first_surname: process.env.FIRST_SURNAME,
        second_surname: process.env.SECOND_SURNAME,
        password: pass,
        role: 'ADMIN',
        activation_link: "*"
      },
      create: {
        email: process.env.ADMIN_LOGIN,
        login: process.env.ADMIN_LOGIN,
        name: process.env.ADMIN_NAME,
        first_surname: process.env.FIRST_SURNAME,
        second_surname: process.env.SECOND_SURNAME,
        password: pass,
        role: 'ADMIN',
        activation_link: "*"
      },
    });
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
