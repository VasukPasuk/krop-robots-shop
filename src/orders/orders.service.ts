import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../utils/prisma.service";
import {CreateOrderDto} from "./dto/create-order.dto";
import {TelegramService} from "../telegram/telegram.service";
import prepareMessageTemplate from "../__features/prepareMessageTemplate";
import {OrderPaginationDTO} from "./dto/order-pagination.dto";
import {OrderStatus} from "@prisma/client";

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramService: TelegramService
  ) {
  }

  getMany() {
    return this.prisma.order.findMany()
  }

  async create(createOrderDto: CreateOrderDto) {
    const {items, ...rest} = createOrderDto


    const order = await this.prisma.order.create({
      data: {
        ...rest,
        items: {
          createMany: {
            data: items.map((cartItem) => ({
              amount: cartItem.amount,
              variant_id: cartItem.variantId,
              product_name: cartItem.productName,
              color_name: cartItem.colorName,
              price: cartItem.price,
              plastic: cartItem.plastic,
            }))
          }
        }
      },
      include: {
        items: {
          include: {
            variant: {
              select: {
                size_label: true
              }
            }
          }
        }
      }
    })

    if (order) {
      await this.telegramService.sendMessageToTelegram(prepareMessageTemplate(order))
    }

    return order
  }

  async fulfillOrder(orderId: number) {
    const exists = await this.prisma.order.findUnique({
      where: {id: orderId}
    })

    if (!exists) {
      throw new NotFoundException(`Товар з ID ${orderId} оновити не вдалося.`)
    }
    return this.prisma.order.update({
      where: {id: orderId},
      data: {
        status: "FULFILLED"
      }
    })
  }

  async getOrderWithItems(orderId: number) {
    return this.prisma.order.findUnique({
      where: {id: orderId},
      include: {
        items: {
          include: {
            variant: {
              select: {
                size_label: true
              }
            }
          }
        }
      }
    })
  }

  async getManyOrders(orderPaginationDTO: OrderPaginationDTO) {
    const {page, limit} = orderPaginationDTO;
    const [items, count] = await Promise.all([
      this.prisma.order.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.order.count()
    ])
    return {
      items,
      count
    }
  }

  async changeOrderStatus(id: number, status: OrderStatus) {
    return this.prisma.order.update({
      where: {id: id},
      data: {
        status: status
      }
    })
  }
}
