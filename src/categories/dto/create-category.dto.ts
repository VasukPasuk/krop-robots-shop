import { PickType } from "@nestjs/mapped-types";
import {BaseCategoryDto} from "./base-category.dto";
import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({
    description: "Category name text.",
  })
  @IsString()
  name: string
  @ApiProperty({
    description: "Category description text.",
  })
  @IsString()
  description: string
}