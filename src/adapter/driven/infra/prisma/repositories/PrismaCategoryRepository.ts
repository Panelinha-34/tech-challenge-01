import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Category } from "@/core/domain/entities/Category";
import { ICategoryRepository } from "@/core/domain/repositories/ICategoryRepository";

import { prisma } from "../config/prisma";
import { PrismaCategoryToDomainCategoryConverter } from "../converter/PrismaCategoryToDomainClientConverter";

export class PrismaCategoryRepository implements ICategoryRepository {
  async findById(id: string): Promise<Category | null> {
    return prisma.category
      .findUnique({
        where: {
          id,
        },
      })
      .then((category) =>
        category
          ? PrismaCategoryToDomainCategoryConverter.convert(category)
          : null
      );
  }

  async findByName(name: string): Promise<Category | null> {
    return prisma.category
      .findFirst({
        where: {
          name,
        },
      })
      .then((category) =>
        category
          ? PrismaCategoryToDomainCategoryConverter.convert(category)
          : null
      );
  }

  async findMany({ page, size }: PaginationParams): Promise<Category[]> {
    return prisma.category
      .findMany({
        take: size,
        skip: (page - 1) * size,
      })
      .then((categories) =>
        categories.map((c) =>
          PrismaCategoryToDomainCategoryConverter.convert(c)
        )
      );
  }

  async create(category: Category): Promise<Category> {
    return prisma.category
      .create({
        data: {
          name: category.name,
        },
      })
      .then((c) => PrismaCategoryToDomainCategoryConverter.convert(c));
  }

  async update(category: Category): Promise<Category> {
    return prisma.category
      .update({
        where: {
          id: category.id.toString(),
        },
        data: {
          name: category.name,
        },
      })
      .then((c) => PrismaCategoryToDomainCategoryConverter.convert(c));
  }
}
