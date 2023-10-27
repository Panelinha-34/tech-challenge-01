import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { ComboProduct } from "@/core/domain/entities/ComboProduct";
import { IComboProductRepository } from "@/core/domain/repositories/IComboProductRepository";

import { prisma } from "../config/prisma";
import { PrismaComboProductToDomainClientConverter } from "../converter/PrismaComboProductToDomainClientConverter";

export class PrismaComboProductRepository implements IComboProductRepository {
  async findByProductIdAndComboId(
    productId: string,
    comboId: string
  ): Promise<ComboProduct | null> {
    return prisma.comboProduct
      .findFirst({
        where: {
          combo_id: comboId,
          product_id: productId,
        },
      })
      .then((comboProduct) =>
        comboProduct
          ? PrismaComboProductToDomainClientConverter.convert(comboProduct)
          : null
      );
  }

  async findById(id: string): Promise<ComboProduct | null> {
    return prisma.comboProduct
      .findUnique({
        where: {
          id,
        },
      })
      .then((comboProduct) =>
        comboProduct
          ? PrismaComboProductToDomainClientConverter.convert(comboProduct)
          : null
      );
  }

  async findMany({ page, size }: PaginationParams): Promise<ComboProduct[]> {
    return prisma.comboProduct
      .findMany({
        take: size,
        skip: (page - 1) * size,
      })
      .then((comboProducts) =>
        comboProducts.map((c) =>
          PrismaComboProductToDomainClientConverter.convert(c)
        )
      );
  }

  async findManyByComboID(comboId: string): Promise<ComboProduct[]> {
    return prisma.comboProduct
      .findMany({
        where: {
          combo_id: comboId,
        },
      })
      .then((comboProducts) =>
        comboProducts.map((c) =>
          PrismaComboProductToDomainClientConverter.convert(c)
        )
      );
  }

  async create(comboProduct: ComboProduct): Promise<ComboProduct> {
    return prisma.comboProduct
      .create({
        data: {
          combo_id: comboProduct.comboId.toString(),
          product_id: comboProduct.productId.toString(),
        },
      })
      .then((c) => PrismaComboProductToDomainClientConverter.convert(c));
  }

  async createMany(comboProducts: ComboProduct[]): Promise<number> {
    return prisma.comboProduct
      .createMany({
        data: comboProducts.map((c) => ({
          combo_id: c.comboId.toString(),
          product_id: c.productId.toString(),
        })),
      })
      .then(({ count }) => count);
  }

  async deleteMany(comboProducts: ComboProduct[]): Promise<number> {
    return prisma.comboProduct
      .deleteMany({
        where: {
          OR: comboProducts.map((c) => ({
            combo_id: c.comboId.toString(),
            product_id: c.productId.toString(),
          })),
        },
      })
      .then(({ count }) => count);
  }

  async deleteByComboId(id: string): Promise<void> {
    await prisma.comboProduct.deleteMany({
      where: {
        combo_id: id,
      },
    });
  }
}
