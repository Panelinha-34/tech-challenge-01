import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Product } from "@/core/domain/entities/Product";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";

import { prisma } from "../config/prisma";
import { PrismaClientToDomainClientConverter } from "../converter/PrismaClientToDomainClientConverter";
import { PrismaProductToDomainClientConverter } from "../converter/PrismaProductToDomainClientConverter";

export class PrismaProductRepository implements IProductRepository {
  findByName(name: string): Promise<Product | null> {
    return prisma.product
      .findFirst({
        where: {
          name,
        },
      })
      .then((product) =>
        product ? PrismaProductToDomainClientConverter.convert(product) : null
      );
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product
      .findUnique({
        where: {
          id,
        },
      })
      .then((product) =>
        product ? PrismaProductToDomainClientConverter.convert(product) : null
      );
  }

  async findMany({ page, size }: PaginationParams): Promise<Product[]> {
    return prisma.product
      .findMany({
        take: size,
        skip: (page - 1) * size,
      })
      .then((products) =>
        products.map((c) => PrismaProductToDomainClientConverter.convert(c))
      );
  }

  async create(product: Product): Promise<Product> {
    return prisma.product
      .create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          category_id: product.categoryId,
        },
      })
      .then((c) => PrismaProductToDomainClientConverter.convert(c));
  }

  async update(product: Product): Promise<Product> {
    return prisma.product
      .update({
        where: {
          id: product.id.toString(),
        },
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          category_id: product.categoryId,
        },
      })
      .then((c) => PrismaProductToDomainClientConverter.convert(c));
  }
}
