import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import {TelegrafModule} from "nestjs-telegraf";
import {PrismaService} from "../utils/prisma.service";
import {ConfigModule} from "@nestjs/config";
import {OrdersModule} from "../orders/orders.module";
import {OrdersService} from "../orders/orders.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN
    }),
    OrdersModule
  ],
  controllers: [],
  providers: [TelegramService, TelegramController, PrismaService, OrdersService],
})
export class TelegramModule {}
