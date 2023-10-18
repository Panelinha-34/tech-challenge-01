/*
  Warnings:

  - A unique constraint covering the columns `[tax_vat]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "clients_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "clients_tax_vat_key" ON "clients"("tax_vat");
