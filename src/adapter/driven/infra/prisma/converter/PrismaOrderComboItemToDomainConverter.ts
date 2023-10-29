import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { OrderComboItem } from "@/core/domain/entities/OrderComboItem";
import { OrderComboItem as PrismaOrderComboItem } from "@prisma/client";

export class PrismaOrderComboItemToDomainConverter {
  static convert(prismaClient: PrismaOrderComboItem): OrderComboItem {
    return new OrderComboItem(
      {
        orderId: new UniqueEntityId(prismaClient.order_id),
        comboId: new UniqueEntityId(prismaClient.combo_id),
        quantity: prismaClient.quantity,
        totalPrice: prismaClient.total_price.toNumber(),
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
        annotation: prismaClient.annotation ?? undefined,
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
