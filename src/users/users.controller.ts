import {Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import {ApiTags} from "@nestjs/swagger";
import {UserPaginationDto} from "./dto/user-pagination.dto";


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':login')
  findOne(@Param('login') login: string) {
    return this.usersService.findOne(login)
  }
}
