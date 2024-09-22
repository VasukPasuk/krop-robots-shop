import {CreateProductDto} from "./create-product.dto";
import {IsBoolean} from "class-validator";
import {BaseProductDto} from "./base-product.dto";
import {OmitType} from "@nestjs/swagger";

export class UpdateProductDto extends OmitType(BaseProductDto, ["created_at", "updated_at", 'id', ] as const) {}