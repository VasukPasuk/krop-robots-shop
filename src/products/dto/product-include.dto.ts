import {EnumStringToBooleanObject} from "../../decorators/class-transform-validation/EnumStringToBooleanObject";

enum AllowedIncludesEnum {
  variants = "variants", photos = "photos"
}

export class ProductIncludeDto {
  @EnumStringToBooleanObject(AllowedIncludesEnum)
  include: {[key in keyof typeof AllowedIncludesEnum]?: boolean};
}
