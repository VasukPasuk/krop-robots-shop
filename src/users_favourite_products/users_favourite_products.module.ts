import { Module } from '@nestjs/common';
import { UsersFavouriteProductsService } from './users_favourite_products.service';
import { UsersFavouriteProductsController } from './users_favourite_products.controller';

@Module({
  controllers: [UsersFavouriteProductsController],
  providers: [UsersFavouriteProductsService],
})
export class UsersFavouriteProductsModule {}
