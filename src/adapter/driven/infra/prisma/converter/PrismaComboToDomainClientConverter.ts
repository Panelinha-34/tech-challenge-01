import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Combo } from "@/core/domain/entities/Combo";
import { ComboProduct } from "@/core/domain/entities/ComboProduct";
import { ComboProductList } from "@/core/domain/entities/ComboProductList";
import { Combo as PrismaCombo } from "@prisma/client";

export class PrismaComboToDomainClientConverter {
  static convert(prismaClient: PrismaCombo, products?: ComboProduct[]): Combo {
    return new Combo(
      {
        name: prismaClient.name,
        description: prismaClient.description,
        price: prismaClient.price.toNumber(),
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
        products: new ComboProductList(products),
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
