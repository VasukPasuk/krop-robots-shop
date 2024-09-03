import {Product} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";

export class BaseTagDto {
  @ApiProperty({description: "Id"})
  id: number

  @ApiProperty({description: "Name"})
  name: string

  @ApiProperty({description: "Description"})
  description: string

  @ApiProperty({description: "Created at"})
  created_at: Date

  @ApiProperty({description: "Updated at"})
  updated_at: Date

}