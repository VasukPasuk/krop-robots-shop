
import {Variant} from "@prisma/client";
import {isArray, IsArray, IsString} from "class-validator";
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
    return JSON.parse(value)
  })
  variants: Omit<Variant, "id" | "created_at" | "updated_at">[]

  @ApiProperty()
  @Transform(({value}) => {
    return JSON.parse(value)
  })
  tags: string[]
}