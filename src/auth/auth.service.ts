import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {PrismaService} from "../utils/prisma.service";
import * as bcrypt from 'bcrypt';
import {UsersService} from "../users/users.service";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
  }

  async validateUser(login: string, password: string) {
    const user = await this.usersService.findOne(login);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: TypeUser) {
    const payload = {
      id: user.id,
      login: user.login,
      role: user.role
    }
    return {
      ...payload,
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const data = await this.jwtService.verifyAsync<TypeUser>(refreshToken, {
        secret: this.configService.get<string>("REFRESH_TOKEN_SECRET_KEY"),
      });
      const newPayload = {role: data.role, id: data.id, login: data.login};
      return this.generateAccessToken(newPayload)

    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }


  private generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>("ACCESS_TOKEN_SECRET_KEY"),
      expiresIn: '15m',
    });
  }

  private generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>("REFRESH_TOKEN_SECRET_KEY"),
      expiresIn: '30d',
    });
  }

}