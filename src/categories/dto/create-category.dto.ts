import { PickType } from "@nestjs/mapped-types";
import {BaseCategoryDto} from "./base-category.dto";

export class CreateCategoryDto extends PickType(BaseCategoryDto, ["name", "description"] as const) {}