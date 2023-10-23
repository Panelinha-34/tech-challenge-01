import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Combo } from "@/core/domain/entities/Combo";
import { Combo as PrismaCombo } from "@prisma/client";

export class PrismaComboToDomainClientConverter {
  static convert(prismaClient: PrismaCombo): Combo {
    return new Combo(
      {
        name: prismaClient.name,
        description: prismaClient.description,
        price: prismaClient.price.toNumber(),
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
