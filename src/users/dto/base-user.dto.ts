import {ApiProperty} from "@nestjs/swagger";
import {$Enums} from ".prisma/client";

export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER"
}

export class BaseUserDto {
  id: number
  name: string
  first_surname: string
  second_surname: string
  email: string
  login: string
  password: string
  activated: boolean
  activation_link: string
  avatar_src: string
  role: Role
  created_at: string
  updated_at: string

}