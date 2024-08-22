/*
  Warnings:

  - Made the column `productName` on table `variants` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "variants" DROP CONSTRAINT "variants_productName_fkey";

-- AlterTable
ALTER TABLE "variants" ALTER COLUMN "productName" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_productName_fkey" FOREIGN KEY ("productName") REFERENCES "products"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
