import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { ComboProduct } from "@/core/domain/entities/ComboProduct";
import { IComboProductRepository } from "@/core/domain/repositories/IComboProductRepository";

import { prisma } from "../config/prisma";
import { 
  PrismaComboProductToDomainClientConverter 
} from '../converter/PrismaComboProductToDomainClientConverter';

export class PrismaComboProductRepository implements IComboProductRepository {
  async findByProductIdAndComboId(
    productId: string, comboId: string
  ): Promise<ComboProduct | null> {
    return prisma.comboProduct
      .findFirst({
        where: {
          combo_id: comboId,
          product_id: productId
        }
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
          PrismaComboProductToDomainClientConverter.convert(c))
      );
  }

  async create(comboProduct: ComboProduct): Promise<ComboProduct> {
    return prisma.comboProduct
      .create({
        data: {
          combo_id: comboProduct.comboId,
          product_id: comboProduct.productId,
        },
      })
      .then((c) => PrismaComboProductToDomainClientConverter.convert(c));
  }

  async delete(comboProduct: ComboProduct): Promise<ComboProduct> {
    return prisma.comboProduct
      .delete({
        where: {
          id: comboProduct.id.toString(),
        }
      })
      .then((c) => PrismaComboProductToDomainClientConverter.convert(c));
  }
}
