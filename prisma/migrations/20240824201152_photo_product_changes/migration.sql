/*
  Warnings:

  - Added the required column `product_name` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "photos" ADD COLUMN     "product_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "products"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
