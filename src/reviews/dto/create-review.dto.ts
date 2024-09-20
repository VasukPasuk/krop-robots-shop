import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateReviewDto {
  @ApiProperty({
    example: "Тарас"
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: "Бульба"
  })
  @IsString()
  @IsNotEmpty()
  surname: string

  @ApiProperty({
    example: "Цей товар дуже чудовий, а ще й по низькій ціні!"
  })
  @IsString()
  @IsNotEmpty()
  body: string

  @ApiProperty({
    example: "Кітики",
    description: "Ім'я(ідентифікатор) продукту.",
  })
  @IsString()
  @IsNotEmpty()
  product_name: string
}