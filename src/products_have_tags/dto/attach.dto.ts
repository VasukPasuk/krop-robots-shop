import {PickType} from "@nestjs/mapped-types";
import {BaseProdAndTagDto} from "./base-prod-and-tag.dto";

export class AttachDto extends PickType(BaseProdAndTagDto, ["tag_name", "product_name"] as const) {}