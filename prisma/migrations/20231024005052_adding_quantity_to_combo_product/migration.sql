/*
  Warnings:

  - Added the required column `quantity` to the `combo_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "combo_products" ADD COLUMN     "quantity" INTEGER NOT NULL;
