import {PickType} from "@nestjs/mapped-types";
import {BasePhotoDto} from "./base-photo.dto";

export class CreatePhotoDto extends PickType(BasePhotoDto, ["product_name"] as const) {}