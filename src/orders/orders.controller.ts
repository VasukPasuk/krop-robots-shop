import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {ApiTags} from "@nestjs/swagger";
import {CreateOrderDto} from "./dto/create-order.dto";
import {OrderPaginationDTO} from "./dto/order-pagination.dto";
import {OrderStatus} from "@prisma/client";


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }

  @Get()
  getManyOrders(@Query() orderPaginationDTO: OrderPaginationDTO) {
    return this.ordersService.getManyOrders(orderPaginationDTO)
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto)
  }

  @Patch('/status/:id')
  async changeOrderStatus(@Param('id', ParseIntPipe) id: number, @Body("status") status: OrderStatus) {
    return await this.ordersService.changeOrderStatus(id, status)
  }
}
