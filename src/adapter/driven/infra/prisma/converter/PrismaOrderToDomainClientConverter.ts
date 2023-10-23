import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Order } from "@/core/domain/entities/Order";
import { Order as PrismaOrder } from "@prisma/client";

export class PrismaOrderToDomainClientConverter {
  static convert(prismaClient: PrismaOrder): Order {
    return new Order(
      {
        status: prismaClient.status,
        clientId: prismaClient.client_id,
        totalPrice: prismaClient.total_price.toNumber(),
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
