/*
  Warnings:

  - The values [USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `customer_contacts` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `orders` table. All the data in the column will be lost.
  - The primary key for the `products_have_Tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `products_have_Tags` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the `revies` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `colors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `photos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_surname` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_type` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_surname` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `photos` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PROCESSING', 'FULFILLED');

-- CreateEnum
CREATE TYPE "Plastic" AS ENUM ('CoPET', 'PLA');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'CUSTOMER');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_product_name_fkey";

-- DropForeignKey
ALTER TABLE "products_have_Tags" DROP CONSTRAINT "products_have_Tags_product_name_fkey";

-- DropForeignKey
ALTER TABLE "products_have_Tags" DROP CONSTRAINT "products_have_Tags_tag_name_fkey";

-- DropForeignKey
ALTER TABLE "revies" DROP CONSTRAINT "revies_product_name_fkey";

-- DropForeignKey
ALTER TABLE "revies" DROP CONSTRAINT "revies_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users_favourite_products" DROP CONSTRAINT "users_favourite_products_product_name_fkey";

-- DropForeignKey
ALTER TABLE "users_favourite_products" DROP CONSTRAINT "users_favourite_products_user_id_fkey";

-- DropIndex
DROP INDEX "products_have_Tags_tag_name_product_name_idx";

-- DropIndex
DROP INDEX "variants_name_key";

-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "plastic" "Plastic" NOT NULL DEFAULT 'CoPET',
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "customer_contacts",
DROP COLUMN "customer_id",
DROP COLUMN "payment",
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "first_surname" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "payment_type" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "second_surname" TEXT NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PROCESSING';

-- AlterTable
ALTER TABLE "photos" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "products_have_Tags" DROP CONSTRAINT "products_have_Tags_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "products_have_Tags_pkey" PRIMARY KEY ("tag_name", "product_name");

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "activation_link" DROP NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';

-- AlterTable
ALTER TABLE "variants" DROP COLUMN "name";

-- DropTable
DROP TABLE "revies";

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "carts_user_id_key" ON "carts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_key" ON "categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "colors_id_key" ON "colors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "photos_name_key" ON "photos"("name");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_id_key" ON "tags"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE INDEX "variants_product_name_size_label_idx" ON "variants"("product_name", "size_label");

-- AddForeignKey
ALTER TABLE "products_have_Tags" ADD CONSTRAINT "products_have_Tags_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "products"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_have_Tags" ADD CONSTRAINT "products_have_Tags_tag_name_fkey" FOREIGN KEY ("tag_name") REFERENCES "tags"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_favourite_products" ADD CONSTRAINT "users_favourite_products_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "products"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_favourite_products" ADD CONSTRAINT "users_favourite_products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "products"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "products"("name") ON DELETE CASCADE ON UPDATE CASCADE;
