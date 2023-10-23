import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Order } from "@/core/domain/entities/Order";
import { IOrderRepository } from "@/core/domain/repositories/IOrderRepository";

import { prisma } from "../config/prisma";
import { PrismaOrderToDomainClientConverter } from "../converter/PrismaOrderToDomainClientConverter";

export class PrismaOrderRepository implements IOrderRepository {
  async create(order: Order): Promise<Order> {
    return prisma.order
      .create({
        data: {
          status: order.status,
          total_price: order.totalPrice,
          client_id: order.clientId,
        },
      })
      .then((c) => PrismaOrderToDomainClientConverter.convert(c));
  }

  async findMany({ page, size }: PaginationParams): Promise<Order[]> {
    return prisma.order
      .findMany({
        take: size,
        skip: (page - 1) * size,
      })
      .then((orders) =>
        orders.map((c) => PrismaOrderToDomainClientConverter.convert(c))
      );
  }
}
