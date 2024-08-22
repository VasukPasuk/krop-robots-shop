import { PickType } from "@nestjs/mapped-types";
import {BaseColorDto} from "./base-color.dto";

export class CreateColorDto extends PickType(BaseColorDto, ["name", "hex"] as const) {}
