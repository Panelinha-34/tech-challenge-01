import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Combo } from "@/core/domain/entities/Combo";
import { IComboProductRepository } from "@/core/domain/repositories/IComboProductRepository";
import { IComboRepository } from "@/core/domain/repositories/IComboRepository";

import { prisma } from "../config/prisma";
import { PrismaComboToDomainClientConverter } from "../converter/PrismaComboToDomainClientConverter";

export class PrismaComboRepository implements IComboRepository {
  constructor(private comboProductRepository: IComboProductRepository) {}

  async findById(id: string): Promise<Combo | null> {
    const comboData = await prisma.combo.findUnique({
      where: {
        id,
      },
    });

    if (!comboData) {
      return null;
    }

    const products = await this.comboProductRepository.findManyByComboID(
      comboData.id.toString()
    );

    return PrismaComboToDomainClientConverter.convert(comboData, products);
  }

  async findManyByIds(ids: string[]): Promise<Combo[]> {
    const combosData = await prisma.combo.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const combos = combosData.map((c) =>
      PrismaComboToDomainClientConverter.convert(c)
    );

    return combos;
  }

  async findMany({
    page,
    size,
  }: PaginationParams): Promise<PaginationResponse<Combo>> {
    const totalItems = await prisma.combo.count();
    const totalPages = Math.ceil(totalItems / size);

    const data = await prisma.combo.findMany({
      skip: (page - 1) * size,
      take: size,
    });

    return new PaginationResponse<Combo>({
      data: data.map((c) => PrismaComboToDomainClientConverter.convert(c)),
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async create(combo: Combo): Promise<Combo> {
    const comboData = await prisma.combo.create({
      data: {
        id: combo.id.toString(),
        name: combo.name,
        description: combo.description,
        price: combo.price,
      },
    });

    await this.comboProductRepository.createMany(combo.products.getItems());

    return PrismaComboToDomainClientConverter.convert(comboData);
  }

  async update(combo: Combo): Promise<Combo> {
    const updatedCombo = await prisma.combo.update({
      where: {
        id: combo.id.toString(),
      },
      data: {
        name: combo.name,
        description: combo.description,
        price: combo.price,
      },
    });

    const productsToAdd = combo.products.getNewItems();

    if (productsToAdd.length) {
      await this.comboProductRepository.createMany(productsToAdd);
    }

    const productsToRemove = combo.products.getRemovedItems();

    if (productsToRemove.length) {
      await this.comboProductRepository.deleteMany(productsToRemove);
    }

    return PrismaComboToDomainClientConverter.convert(
      updatedCombo,
      combo.products.getItems()
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.combo.delete({
      where: {
        id,
      },
    });

    await this.comboProductRepository.deleteByComboId(id);
  }
}
