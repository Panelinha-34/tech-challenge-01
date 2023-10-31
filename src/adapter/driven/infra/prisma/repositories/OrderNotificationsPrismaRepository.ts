import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
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
  }: PaginationParams): Promise<PaginationResponse<OrderNotification>> {
    const totalItems = await prisma.orderNotification.count();
    const totalPages = Math.ceil(totalItems / size);

    const data = await prisma.orderNotification.findMany({
      skip: (page - 1) * size,
      take: size,
    });

    return new PaginationResponse<OrderNotification>({
      data: data.map((c) =>
        PrismaOrderNotificationToDomainClientConverter.convert(c)
      ),
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async create(
    orderNotification: OrderNotification
  ): Promise<OrderNotification> {
    const createdOrderNotification = await prisma.orderNotification.create({
      data: {
        client_id: orderNotification.clientId.toString(),
        order_id: orderNotification.orderId.toString(),
        message: orderNotification.message,
        status: orderNotification.status.name,
      },
    });

    return PrismaOrderNotificationToDomainClientConverter.convert(
      createdOrderNotification
    );
  }

  async findById(id: string): Promise<OrderNotification | null> {
    const orderNotification = await prisma.orderNotification.findUnique({
      where: { id },
    });

    if (!orderNotification) return null;

    return PrismaOrderNotificationToDomainClientConverter.convert(
      orderNotification
    );
  }

  async update(
    orderNotification: OrderNotification
  ): Promise<OrderNotification> {
    const updatedOrderNotification = await prisma.orderNotification.update({
      where: { id: orderNotification.id.toString() },
      data: {
        status: orderNotification.status.name,
      },
    });

    return PrismaOrderNotificationToDomainClientConverter.convert(
      updatedOrderNotification
    );
  }
}
