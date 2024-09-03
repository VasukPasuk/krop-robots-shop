import {PickType} from "@nestjs/mapped-types";
import {BaseProductDto} from "./base-product.dto";
import {Type} from "class-transformer";

export class CreateProductDto extends PickType(BaseProductDto, ["category_name", "discount", "name", "description"] as const) {
  @Type(() => Number)
  discount = 0
}