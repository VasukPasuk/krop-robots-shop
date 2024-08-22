import {Category} from "@prisma/client";

export class BaseCategoryDto {
  id: number
  name: string
  description: string
  created_at: Date
  updated_at: Date
}