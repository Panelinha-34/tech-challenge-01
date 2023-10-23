import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Client } from "@/core/domain/entities/Client";
import { IClientRepository } from "@/core/domain/repositories/IClientRepository";

import { prisma } from "../config/prisma";
import { PrismaClientToDomainClientConverter } from "../converter/PrismaClientToDomainClientConverter";

export class PrismaClientRepository implements IClientRepository {
  async findById(id: string): Promise<Client | null> {
    return prisma.client
      .findUnique({
        where: {
          id,
        },
      })
      .then((client) =>
        client ? PrismaClientToDomainClientConverter.convert(client) : null
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
        client ? PrismaClientToDomainClientConverter.convert(client) : null
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
        client ? PrismaClientToDomainClientConverter.convert(client) : null
      );
  }

  async findMany({ page, size }: PaginationParams): Promise<Client[]> {
    return prisma.client
      .findMany({
        take: size,
        skip: (page - 1) * size,
      })
      .then((clients) =>
        clients.map((c) => PrismaClientToDomainClientConverter.convert(c))
      );
  }

  async create(client: Client): Promise<Client> {
    return prisma.client
      .create({
        data: {
          name: client.name,
          email: client.email,
          tax_vat: client.taxVat.number,
        },
      })
      .then((c) => PrismaClientToDomainClientConverter.convert(c));
  }

  async update(client: Client): Promise<Client> {
    return prisma.client
      .update({
        where: {
          id: client.id.toString(),
        },
        data: {
          name: client.name,
          email: client.email,
        },
      })
      .then((c) => PrismaClientToDomainClientConverter.convert(c));
  }
}
