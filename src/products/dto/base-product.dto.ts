import {Product} from "@prisma/client";

export class BaseProductDto {
  id: number
  name: string
  discount: number
  popular: boolean
  category_name: string
  description: string
  created_at: Date
  updated_at: Date
}