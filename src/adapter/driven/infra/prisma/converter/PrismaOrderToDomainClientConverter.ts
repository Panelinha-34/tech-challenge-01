import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Order } from "@/core/domain/entities/Order";
import { OrderStatusEnum } from "@/core/domain/enum/OrderStatusEnum";
import { OrderStatus } from "@/core/domain/valueObjects/OrderStatus";
import { Order as PrismaOrder } from "@prisma/client";

export class PrismaOrderToDomainClientConverter {
  static convert(prismaClient: PrismaOrder): Order {
    return new Order(
      {
        status: new OrderStatus({
          name: prismaClient.status as OrderStatusEnum,
        }),
        clientId: prismaClient.client_id ?? undefined,
        totalPrice: prismaClient.total_price.toNumber(),
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
