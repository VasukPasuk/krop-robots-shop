import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {PrismaService} from "../utils/prisma.service";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
