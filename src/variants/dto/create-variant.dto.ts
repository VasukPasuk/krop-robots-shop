import {PickType} from "@nestjs/mapped-types";
import {Type} from "class-transformer";
import {BaseVariantDto} from "./base-variant.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsPositive, IsString, Min} from "class-validator";

export class CreateVariantDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  height: number

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  length: number

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  price: number

  @ApiProperty()
  size_label: string

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  weight: number

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  width: number

  @ApiProperty()
  @IsString()
  product_name: string
}