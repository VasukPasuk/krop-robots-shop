import {BasePaginationDto} from "../../DTO/base-pagination.dto";
import {ApiProperty} from "@nestjs/swagger";

export class PaginationReviewDto extends BasePaginationDto {
  @ApiProperty({
    example: "newest",
    default: "newest",
    description: "Флаг, який змінює порядок виведення коментарів.",
    examples: ["latest" ,  "newest"],
  })
  flag: "latest" | "newest" = "newest"
}