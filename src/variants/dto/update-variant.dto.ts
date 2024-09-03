import {CreateVariantDto} from "./create-variant.dto";
import {PartialType} from "@nestjs/mapped-types";

export class UpdateVariantDto extends PartialType(CreateVariantDto) {}