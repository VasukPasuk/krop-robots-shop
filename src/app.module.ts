import {MiddlewareConsumer, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PrismaService} from "./utils/prisma.service";
import {UsersModule} from './users/users.module';
import {CategoriesModule} from './categories/categories.module';
import {ProductsModule} from './products/products.module';
import {VariantsModule} from './variants/variants.module';
import {LoggingMiddleware} from "./utils/logger.service";
import {ConfigModule} from "@nestjs/config";
import {ColorsModule} from './colors/colors.module';
import {TagsModule} from './tags/tags.module';
import {UsersFavouriteProductsModule} from './users_favourite_products/users_favourite_products.module';
import {ProductsHaveTagsModule} from './products_have_tags/products_have_tags.module';
import {ReviewsModule} from './reviews/reviews.module';
import {OrdersModule} from './orders/orders.module';
import {OrderItemsModule} from './order_items/order_items.module';
import {CartsModule} from './carts/carts.module';
import {CartItemsModule} from './cart_items/cart_items.module';
import {FilesService} from './files/files.service';
import {PhotosModule} from './photos/photos.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path';
import {ScheduleModule} from "@nestjs/schedule";
import {TelegramModule} from './telegram/telegram.module';
import {AuthModule} from "./auth/auth.module";
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "./__guards/roles.guard";
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [UsersModule,
    CategoriesModule,
    ProductsModule, VariantsModule,
    ConfigModule.forRoot({isGlobal: true}),
    ColorsModule, TagsModule,
    UsersFavouriteProductsModule,
    ProductsHaveTagsModule,
    ReviewsModule, OrdersModule,
    OrderItemsModule, CartsModule,
    CartItemsModule, PhotosModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'static'),
      serveRoot: "/static/"
    }),
    ScheduleModule.forRoot(),
    TelegramModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    FilesService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtService
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
