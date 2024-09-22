import {PickType} from "@nestjs/mapped-types";
import {BaseProductDto} from "./base-product.dto";
import {Variant} from "@prisma/client";
import {IsArray, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Transform} from "class-transformer";

export class CreateProductDto {
  @IsString()
  category_name: string

  @IsString()
  name: string

  @IsString()
  description: string

  @Transform(({value}) => {
    return value.map((str: string) => JSON.parse(str))
  })
  variants: Omit<Variant, "id" | "created_at" | "updated_at">[]

  @ApiProperty()
  @IsArray()
  tags: string[]
}