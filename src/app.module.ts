import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaService} from "./prisma.service";
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { VariantsModule } from './variants/variants.module';

@Module({
  imports: [UsersModule, CategoriesModule, ProductsModule, VariantsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
