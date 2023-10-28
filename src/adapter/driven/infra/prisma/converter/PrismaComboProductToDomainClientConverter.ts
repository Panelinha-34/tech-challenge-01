import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { ComboProduct } from "@/core/domain/entities/ComboProduct";
import { ComboProduct as PrismaComboProduct } from "@prisma/client";

export class PrismaComboProductToDomainClientConverter {
  static convert(prismaClient: PrismaComboProduct): ComboProduct {
    return new ComboProduct(
      {
        comboId: new UniqueEntityId(prismaClient.combo_id),
        productId: new UniqueEntityId(prismaClient.product_id),
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
