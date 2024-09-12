import { Injectable } from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}
  getMany() {
    return this.prisma.order.findMany()
  }
}
