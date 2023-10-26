import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { OrderProductItem } from "@/core/domain/entities/OrderProductItem";
import { OrderProductItem as PrismaOrderProductItem } from "@prisma/client";

export class PrismaOrderProductItemToDomainConverter {
  static convert(prismaClient: PrismaOrderProductItem): OrderProductItem {
    return new OrderProductItem(
      {
        orderId: prismaClient.order_id,
        quantity: prismaClient.quantity,
        totalPrice: prismaClient.total_price.toNumber(),
        productId: prismaClient.product_id,
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
