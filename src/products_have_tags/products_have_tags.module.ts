import { Module } from '@nestjs/common';
import { ProductsHaveTagsService } from './products_have_tags.service';
import { ProductsHaveTagsController } from './products_have_tags.controller';

@Module({
  controllers: [ProductsHaveTagsController],
  providers: [ProductsHaveTagsService],
})
export class ProductsHaveTagsModule {}
