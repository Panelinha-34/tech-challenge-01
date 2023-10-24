import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Combo } from "@/core/domain/entities/Combo";
import { IComboRepository } from "@/core/domain/repositories/IComboRepository";

import { prisma } from "../config/prisma";
import { PrismaComboToDomainClientConverter } from "../converter/PrismaComboToDomainClientConverter";

export class PrismaComboRepository implements IComboRepository {
  async findByName(name: string): Promise<Combo | null> {
    return prisma.combo
      .findFirst({
        where: {
          name,
        },
      })
      .then((combo) =>
        combo ? PrismaComboToDomainClientConverter.convert(combo) : null
      );
  }

  async findById(id: string): Promise<Combo | null> {
    return prisma.combo
      .findUnique({
        where: {
          id,
        },
      })
      .then((combo) =>
        combo ? PrismaComboToDomainClientConverter.convert(combo) : null
      );
  }

  async findMany({ page, size }: PaginationParams): Promise<Combo[]> {
    return prisma.combo
      .findMany({
        take: size,
        skip: (page - 1) * size,
      })
      .then((combos) =>
        combos.map((c) => PrismaComboToDomainClientConverter.convert(c))
      );
  }

  async create(combo: Combo): Promise<Combo> {
    return prisma.combo
      .create({
        data: {
          name: combo.name,
          description: combo.description,
          price: combo.price,
        },
      })
      .then((c) => PrismaComboToDomainClientConverter.convert(c));
  }

  async update(combo: Combo): Promise<Combo> {
    return prisma.combo
      .update({
        where: {
          id: combo.id.toString(),
        },
        data: {
          name: combo.name,
          description: combo.description,
          price: combo.price,
        },
      })
      .then((c) => PrismaComboToDomainClientConverter.convert(c));
  }
}
