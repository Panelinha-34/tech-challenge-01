import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { OrderComboItem } from "@/core/domain/entities/OrderComboItem";
import { OrderComboItem as PrismaOrderComboItem } from "@prisma/client";

export class PrismaOrderComboItemToDomainConverter {
  static convert(prismaClient: PrismaOrderComboItem): OrderComboItem {
    return new OrderComboItem(
      {
        orderId: prismaClient.order_id,
        quantity: prismaClient.quantity,
        totalPrice: prismaClient.total_price.toNumber(),
        comboId: prismaClient.combo_id,
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
