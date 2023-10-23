-- AlterTable
ALTER TABLE "combo_products" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "order_combo_items" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "order_product_items" ADD COLUMN     "updated_at" TIMESTAMP(3);
