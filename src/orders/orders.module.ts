import {forwardRef, Module} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {PrismaService} from "../utils/prisma.service";
import {TelegramModule} from "../telegram/telegram.module";
import {TelegramService} from "../telegram/telegram.service";

@Module({
  imports: [
    forwardRef(() => TelegramModule)
  ],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, TelegramService],
})
export class OrdersModule {}
