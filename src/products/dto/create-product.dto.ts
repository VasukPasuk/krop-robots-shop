import {PickType} from "@nestjs/mapped-types";
import {BaseProductDto} from "./base-product.dto";

export class CreateProductDto extends PickType(BaseProductDto, ["category_name", "discount", "popular", "name"] as const) {
  popular = false
  discount = 0
}