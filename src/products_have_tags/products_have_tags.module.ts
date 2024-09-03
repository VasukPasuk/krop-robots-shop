import { Module } from '@nestjs/common';
import { ProductsHaveTagsService } from './products_have_tags.service';
import { ProductsHaveTagsController } from './products_have_tags.controller';
import {PrismaService} from "../utils/prisma.service";

@Module({
  controllers: [ProductsHaveTagsController],
  providers: [ProductsHaveTagsService, PrismaService],
})
export class ProductsHaveTagsModule {}
