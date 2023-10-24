import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { OrderNotification } from "@/core/domain/entities/OrderNotification";
import { IOrderNotificationRepository } from "@/core/domain/repositories/IOrderNotificationRepository";

import { prisma } from "../config/prisma";
import { PrismaOrderNotificationToDomainClientConverter } from "../converter/PrismaOrderNotificationToDomainClientConverter";

export class OrderNotificationsPrismaRepository
  implements IOrderNotificationRepository
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
