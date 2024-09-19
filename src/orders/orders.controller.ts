import {Body, Controller, Delete, Get, Patch, Post} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {ApiTags} from "@nestjs/swagger";
import {CreateOrderDto} from "./dto/create-order.dto";


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getMany() {
    return this.ordersService.getMany()
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto)
  }
}
