import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Client } from "@/core/domain/entities/Client";
import { ClientRepository } from "@/core/domain/repositories/ClientRepository";

import { prisma } from "../config/prisma";
import { PrismaClientToDomainClientMapper } from "../mappers/PrismaClientToDomainClientMapper";

export class ClientsPrismaRepository implements ClientRepository {
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
}
