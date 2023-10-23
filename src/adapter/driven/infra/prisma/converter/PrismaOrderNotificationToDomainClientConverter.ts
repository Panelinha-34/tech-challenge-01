import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { OrderNotification } from "@/core/domain/entities/OrderNotification";
import { OrderNotification as PrismaOrderNotification } from "@prisma/client";

export class PrismaOrderNotificationToDomainClientConverter {
  static convert(prismaClient: PrismaOrderNotification): OrderNotification {
    return new OrderNotification(
      {
        status: prismaClient.status,
        message: prismaClient.message,
        orderId: prismaClient.order_id,
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
