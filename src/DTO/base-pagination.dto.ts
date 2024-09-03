import {Transform, Type} from 'class-transformer';
import {IsIn, IsInt, IsOptional, Min, IsBoolean} from 'class-validator';
import {Color} from "@prisma/client";
import {OptionalBoolean} from "../decorators/class-transform-validation/OptionalBoolean.decorator";

export class BasePaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsIn(["asc", "desc", "ASC", "DESC"])
  @Transform(({value}) => value.toLowerCase())
  order_rule: "asc" | "desc" = "desc";

  @IsOptional()
  field?: string

  @IsOptional()
  @Transform(({value}) => value.toLowerCase())
  search?: string


  @OptionalBoolean()
  products_count?: boolean
}
