import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { OrderNotification } from "@/core/domain/entities/OrderNotification";
import { NotificationStatusEnum } from "@/core/domain/enum/NotificationStatusEnum";
import { NotificationStatus } from "@/core/domain/valueObjects/NotificationStatus";
import { OrderNotification as PrismaOrderNotification } from "@prisma/client";

export class PrismaOrderNotificationToDomainClientConverter {
  static convert(prismaClient: PrismaOrderNotification): OrderNotification {
    return new OrderNotification(
      {
        status: new NotificationStatus({
          name: prismaClient.status as NotificationStatusEnum,
        }),
        orderId: new UniqueEntityId(prismaClient.order_id),
        clientId: new UniqueEntityId(prismaClient.client_id),
        message: prismaClient.message,
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
