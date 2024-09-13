import {BasePaginationDto} from "../../DTO/base-pagination.dto";
import {EnumStringToBooleanObject} from "../../decorators/class-transform-validation/EnumStringToBooleanObject";
import {IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min} from "class-validator";
import {Transform, Type} from "class-transformer";

enum AllowedIncludesEnum {
  variants = "variants", photos = "photos"
}

export class ProductPaginationDto extends BasePaginationDto {
  @EnumStringToBooleanObject(AllowedIncludesEnum)
  include: { [key in keyof typeof AllowedIncludesEnum]?: boolean };

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  searchValue?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  searchField?: string;

  @Transform(({value}) => value.split(','))
  @IsNotEmpty()
  @IsOptional()
  filterCategories?: string[];

  @Transform(({value}) => value.split(','))
  @IsNotEmpty()
  @IsOptional()
  filterTags?: string[];

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice = 100000;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice = 0;

  @IsIn([ "ADMIN" , "CUSTOMER"])
  @IsString()
  mode: "ADMIN" | "CUSTOMER" = "CUSTOMER";
}