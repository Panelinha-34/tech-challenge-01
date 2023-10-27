import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Order } from "@/core/domain/entities/Order";
import { OrderComboItem } from "@/core/domain/entities/OrderComboItem";
import { OrderComboItemList } from "@/core/domain/entities/OrderComboItemList";
import { OrderProductItem } from "@/core/domain/entities/OrderProductItem";
import { OrderProductItemList } from "@/core/domain/entities/OrderProductItemList";
import { OrderStatusEnum } from "@/core/domain/enum/OrderStatusEnum";
import { OrderStatus } from "@/core/domain/valueObjects/OrderStatus";
import { Order as PrismaOrder } from "@prisma/client";

export class PrismaOrderToDomainClientConverter {
  static convert(
    prismaClient: PrismaOrder,
    products?: OrderProductItem[],
    combos?: OrderComboItem[]
  ): Order {
    return new Order(
      {
        status: new OrderStatus({
          name: prismaClient.status as OrderStatusEnum,
        }),
        clientId: prismaClient.client_id
          ? new UniqueEntityId(prismaClient.client_id)
          : undefined,
        totalPrice: prismaClient.total_price.toNumber(),
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
        combos: new OrderComboItemList(combos),
        products: new OrderProductItemList(products),
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
