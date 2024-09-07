import {BasePaginationDto} from "../../DTO/base-pagination.dto";
import {EnumStringToBooleanObject} from "../../decorators/class-transform-validation/EnumStringToBooleanObject";

enum AllowedIncludesEnum {
  variants = "variants", photos = "photos"
}

export class ProductPaginationDto extends BasePaginationDto {
  @EnumStringToBooleanObject(AllowedIncludesEnum)
  include: { [key in keyof typeof AllowedIncludesEnum]?: boolean };
}