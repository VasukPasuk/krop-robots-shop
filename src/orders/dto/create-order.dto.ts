import {ApiProperty} from "@nestjs/swagger";
import {ArrayMinSize, IsArray, IsJSON, IsNotEmpty, IsString, Length, MinLength} from "class-validator";

export class CreateOrderDto {
  @ApiProperty()
  @Length(12)
  phone_number: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_surname: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  second_surname: string

  @ApiProperty()
  @IsString()
  comment: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  payment_type: string

  @ApiProperty()
  @IsNotEmpty()
  delivery: string

  @IsArray()
  @ArrayMinSize(1)
  items: {
    colorName: string
    productName: string
    variantId: number
    plastic: "PLA" | "CoPET"
    amount: number
    price: number
  }[]
}