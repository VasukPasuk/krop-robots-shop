import {AuthService} from "./auth.service";
import {Controller, Get, Post, Req, Res, Response, UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {GetCookies} from "../decorators/get-cookies.decorator";
import {User} from "../decorators/user.decorator";
import {Roles} from "../decorators/roles.decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("login")
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request & { user: TypeUser }, @Response({passthrough: true}) response) { // User data will be returned via the local strategy validate method , because it automatically injects data about user into the request (request.user)
    const {accessToken, refreshToken, ...user} = await this.authService.login(req.user);
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return {accessToken, user: {...user}};
  }


  @Get('refresh')
  async refreshToken(@GetCookies("refreshToken") refreshToken: string) {
    const access_token = await this.authService.refreshAccessToken(refreshToken);
    return {
      access_token
    };
  }


  @Get("logout")
  @UseGuards(JwtAuthGuard)
  async logout(@User() user: TypeUser) {
    return user
  }


  // @Get("test")
  // @Roles('ADMIN')
  // @UseGuards(JwtAuthGuard)
  // async test(@User() user: TypeUser) {
  //   return user
  // }
}
