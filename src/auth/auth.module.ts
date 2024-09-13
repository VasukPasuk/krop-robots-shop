import { Module } from '@nestjs/common';
import {AuthService} from "./auth.service";
import {PrismaService} from "../utils/prisma.service";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {AuthController} from "./auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./strategies/local.strategy";
import {UsersService} from "../users/users.service";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("ACCESS_TOKEN_SECRET_KEY"),  // Secret key
        signOptions: { expiresIn: '15m' }, // Time limit
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy, LocalStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
