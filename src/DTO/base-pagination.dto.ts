import {Transform, Type} from 'class-transformer';
import {IsIn, IsInt, IsOptional, Min} from 'class-validator';
import {Color} from "@prisma/client";
import getKeys from "../__features/getKeysFromInterface";

export class BasePaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsIn(["asc", "desc", "ASC", "DESC"])
  @Transform(({value}) => value.toLowerCase())
  order_rule: "asc" | "desc" = "desc";

  @IsOptional()
  @IsIn(["hex", "name"] as Array<keyof Color>)
  field: keyof Color
}
