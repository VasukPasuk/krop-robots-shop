import {CreateProductDto} from "./create-product.dto";
import {PartialType} from "@nestjs/mapped-types";
import {IsBoolean} from "class-validator";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsBoolean()
  popular?: boolean = false
}