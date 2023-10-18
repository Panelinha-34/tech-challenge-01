import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Client } from "@/core/domain/entities/Client";
import { Taxvat } from "@/core/domain/valueObjects/Taxvat";
import { Client as PrismaClient } from "@prisma/client";

export class PrismaClientToDomainClientMapper {
  static convert(prismaClient: PrismaClient): Client {
    return new Client(
      {
        name: prismaClient.name,
        email: prismaClient.email,
        password: prismaClient.password,
        taxVat: new Taxvat({ number: prismaClient.tax_vat }),
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at,
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
