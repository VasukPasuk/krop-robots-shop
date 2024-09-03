import {IsNotEmpty, IsOptional, IsString, MinLength} from "class-validator";

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @IsOptional()
  description?: string
}