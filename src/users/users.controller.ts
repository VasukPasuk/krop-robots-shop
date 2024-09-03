import {Controller, Delete, Get, Patch, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import {ApiTags} from "@nestjs/swagger";
import {UserPaginationDto} from "./dto/user-pagination.dto";


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getMany(pagination: UserPaginationDto) {
    return this.usersService.getMany(pagination)
  }

  @Get(":id")
  getOne() {
  }

  @Post()
  createMany() {
  }

  @Post()
  createOne() {
  }

  @Delete()
  deleteMany() {
  }

  @Delete(':id')
  deleteOneById() {
  }

  @Patch(':id')
  updateOneById() {
  }

  @Patch()
  updateMany() {
  }
}
