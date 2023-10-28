/*
  Warnings:

  - Changed the type of `payment_method` on the `order_payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('QR_CODE');

-- AlterTable
ALTER TABLE "order_payments" DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL;
