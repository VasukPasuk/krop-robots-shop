import {CreateProductDto} from "./create-product.dto";
import {PartialType} from "@nestjs/mapped-types";
import {IsArray, IsBoolean} from "class-validator";
import {Tag} from "@prisma/client";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsBoolean()
  popular: boolean = false

  @IsArray()
  tags: Partial<Tag>[]
}