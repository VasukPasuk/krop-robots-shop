/*
  Warnings:

  - You are about to drop the column `productName` on the `variants` table. All the data in the column will be lost.
  - Added the required column `product_name` to the `variants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "variants" DROP CONSTRAINT "variants_productName_fkey";

-- AlterTable
ALTER TABLE "variants" DROP COLUMN "productName",
ADD COLUMN     "product_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "products"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
