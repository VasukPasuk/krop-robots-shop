import {BasePaginationDto} from "../../DTO/base-pagination.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class PaginationReviewDto extends BasePaginationDto {
  @ApiProperty({
    example: "newest",
    default: "newest",
    description: "Флаг, який змінює порядок виведення коментарів.",
    examples: ["latest" ,  "newest"],
  })
  @IsString()
  flag: "latest" | "newest" = "newest"

  @ApiProperty({
    example: "Зайці"
  })
  @IsString()
  @IsNotEmpty()
  product_name: string
}