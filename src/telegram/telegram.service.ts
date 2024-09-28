import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";
import {InjectBot} from "nestjs-telegraf";
import {Context, Telegraf} from "telegraf";
import {ConfigService} from "@nestjs/config";
import {OrdersService} from "../orders/orders.service";

@Injectable()
export class TelegramService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => OrdersService)) private ordersService: OrdersService,
  ) {
  }

  setup() {
    return this.prisma.user.findMany()
  }

  getProducts() {
    return this.prisma.category.findMany({
      select: {
        name: true,
      }
    })
  }

  checkUser(allowedUsers: Set<number>, userId: number) {
    return allowedUsers.has(userId)
  }

  getOneOrder(orderId: number) {
    return this.ordersService.getOrderWithItems(orderId)
  }

  async sendMessageToTelegram(message: string) {
    return await this.bot.telegram.sendMessage(this.configService.get("VAS_USER_ID"), message);
  }

  async fulfillOrder(orderId: number) {
    return await this.ordersService.fulfillOrder(orderId)
  }
}
