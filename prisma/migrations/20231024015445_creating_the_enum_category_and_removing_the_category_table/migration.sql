/*
  Warnings:

  - You are about to drop the column `category_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantity` to the `combo_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SANDWICH', 'DRINK', 'SIDE_DISH', 'DESSERT');

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- AlterTable
ALTER TABLE "combo_products" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category_id",
ADD COLUMN     "category" "Category" NOT NULL;

-- DropTable
DROP TABLE "categories";
