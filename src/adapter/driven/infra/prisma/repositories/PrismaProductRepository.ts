import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Product } from "@/core/domain/entities/Product";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { Category } from "@/core/domain/valueObjects/Category";

import { prisma } from "../config/prisma";
import { PrismaProductToDomainClientConverter } from "../converter/PrismaProductToDomainClientConverter";

export class PrismaProductRepository implements IProductRepository {
  async findByName(name: string): Promise<Product | null> {
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

  async findByIdAndCategory(
    id: string,
    category: Category
  ): Promise<Product | null> {
    return prisma.product
      .findFirst({
        where: {
          id,
          category: category.name,
        },
      })
      .then((product) =>
        product ? PrismaProductToDomainClientConverter.convert(product) : null
      );
  }

  async findManyByIds(ids: string[]): Promise<Product[]> {
    return prisma.product
      .findMany({
        where: {
          id: {
            in: ids,
          },
        },
      })
      .then((products) =>
        products.map((c) => PrismaProductToDomainClientConverter.convert(c))
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
          category: product.category.name,
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
          category: product.category.name,
        },
      })
      .then((c) => PrismaProductToDomainClientConverter.convert(c));
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
