/*
  Warnings:

  - You are about to drop the column `delivery` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `first_surname` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `second_surname` on the `orders` table. All the data in the column will be lost.
  - Added the required column `delivery_type` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locality` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_color_name_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_product_name_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_variant_id_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_color_name_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_product_name_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_variant_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_name_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_product_name_fkey";

-- AlterTable
ALTER TABLE "cart_items" ALTER COLUMN "cart_id" DROP NOT NULL,
ALTER COLUMN "product_name" DROP NOT NULL,
ALTER COLUMN "color_name" DROP NOT NULL,
ALTER COLUMN "variant_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "order_items" ALTER COLUMN "order_id" DROP NOT NULL,
ALTER COLUMN "product_name" DROP NOT NULL,
ALTER COLUMN "color_name" DROP NOT NULL,
ALTER COLUMN "variant_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "delivery",
DROP COLUMN "first_surname",
DROP COLUMN "phone_number",
DROP COLUMN "second_surname",
ADD COLUMN     "EDRPOY_CODE" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "appartment" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "delivery_type" TEXT NOT NULL,
ADD COLUMN     "department_address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "floor" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "house" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "legal_entity" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "locality" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "surname" TEXT NOT NULL,
ALTER COLUMN "comment" SET DEFAULT '';

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "category_name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "product_name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "PurchaseHistory" (
    "id" SERIAL NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "first_surname" TEXT NOT NULL,
    "second_surname" TEXT NOT NULL,
    "product_names" TEXT NOT NULL,
    "productPrice" INTEGER NOT NULL,
    "product_amount" INTEGER NOT NULL,
    "comment" TEXT,
    "payment_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "categories"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "products"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "products"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_color_name_fkey" FOREIGN KEY ("color_name") REFERENCES "colors"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "products"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_color_name_fkey" FOREIGN KEY ("color_name") REFERENCES "colors"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
