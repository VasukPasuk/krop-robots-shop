import {ApiProperty} from '@nestjs/swagger';
import {ProductHaveTag} from "@prisma/client";

export class BaseProdAndTagDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  product_name: string

  @ApiProperty()
  tag_name: string

  @ApiProperty()
  created_at: string

  @ApiProperty()
  updated_at: string
}