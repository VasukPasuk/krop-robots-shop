import { Injectable } from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";

@Injectable()
export class TelegramService {
  constructor(
    private readonly prisma: PrismaService
  ) {}
  getProducts() {
    return this.prisma.category.findMany({
      select: {
        name: true,
      }
    })
  }
}
