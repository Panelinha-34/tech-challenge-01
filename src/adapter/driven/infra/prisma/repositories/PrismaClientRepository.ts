import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Client } from "@/core/domain/entities/Client";
import { IClientRepository } from "@/core/domain/repositories/iClientRepository";

import { prisma } from "../config/prisma";
import { PrismaClientToDomainClientMapper } from "../mappers/PrismaClientToDomainClientMapper";

export class PrismaClientRepository implements IClientRepository {
  async findById(id: string): Promise<Client | null> {
    return prisma.client
      .findUnique({
        where: {
          id,
        },
      })
      .then((client) =>
        client ? PrismaClientToDomainClientMapper.convert(client) : null
      );
  }

  async findByTaxVat(taxVat: string): Promise<Client | null> {
    return prisma.client
      .findUnique({
        where: {
          tax_vat: taxVat,
        },
      })
      .then((client) =>
        client ? PrismaClientToDomainClientMapper.convert(client) : null
      );
  }

  async findByEmail(email: string): Promise<Client | null> {
    return prisma.client
      .findUnique({
        where: {
          email,
        },
      })
      .then((client) =>
        client ? PrismaClientToDomainClientMapper.convert(client) : null
      );
  }

  async findMany({ page, size }: PaginationParams): Promise<Client[]> {
    return prisma.client
      .findMany({
        take: size,
        skip: (page - 1) * size,
      })
      .then((clients) =>
        clients.map((c) => PrismaClientToDomainClientMapper.convert(c))
      );
  }

  async create(client: Client): Promise<void> {
    await prisma.client.create({
      data: {
        name: client.name,
        email: client.email,
        tax_vat: client.taxVat.number,
      },
    });
  }
}
