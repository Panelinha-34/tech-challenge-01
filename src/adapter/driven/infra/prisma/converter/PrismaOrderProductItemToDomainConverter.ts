import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { OrderProductItem } from "@/core/domain/entities/OrderProductItem";
import { OrderProductItem as PrismaOrderProductItem } from "@prisma/client";

export class PrismaOrderProductItemToDomainConverter {
  static convert(prismaClient: PrismaOrderProductItem): OrderProductItem {
    return new OrderProductItem(
      {
        orderId: new UniqueEntityId(prismaClient.order_id),
        productId: new UniqueEntityId(prismaClient.product_id),
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
