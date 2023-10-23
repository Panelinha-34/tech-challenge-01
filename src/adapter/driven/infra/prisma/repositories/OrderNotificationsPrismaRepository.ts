import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { OrderNotification } from "@/core/domain/entities/OrderNotification";

import { prisma } from "../config/prisma";
import { PrismaOrderNotificationToDomainClientConverter } from "../converter/PrismaOrderNotificationToDomainClientConverter";
import { OrderNotificationRepository } from "@/core/domain/repositories/OrderNotificationRepository";

export class OrderNotificationsPrismaRepository
  implements OrderNotificationRepository
{
  async findMany({
    page,
    size,
  }: PaginationParams): Promise<OrderNotification[]> {
    return prisma.orderNotification
      .findMany({
        take: size,
        skip: (page - 1) * size,
      })
      .then((orders) =>
        orders.map((c) =>
          PrismaOrderNotificationToDomainClientConverter.convert(c)
        )
      );
  }
}
